package com.example.ohbs.service;

import com.example.ohbs.dto.BookingDTO;
import com.example.ohbs.model.Booking;
import com.example.ohbs.model.Room;
import com.example.ohbs.model.User;
import com.example.ohbs.repository.BookingRepository;
import com.example.ohbs.repository.RoomRepository;
import com.example.ohbs.repository.UserRepository;
import com.example.ohbs.exception.ResourceNotFoundException;
import com.example.ohbs.exception.InvalidBookingException;
import com.example.ohbs.service.EmailServices;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Validated
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailServices emailService;

    public List<BookingDTO> getAllBookings() {
        return (List<BookingDTO>) bookingRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public Optional<BookingDTO> getBookingById(Long id) {
        return bookingRepository.findById(id)
            .map(this::convertToDTO);
    }

    public BookingDTO createBooking(@Valid BookingDTO bookingDTO) {
        validateBookingDates(bookingDTO);
        Booking booking = convertToEntity(bookingDTO);
        Booking savedBooking = bookingRepository.save(booking);
        sendBookingConfirmationEmail(savedBooking);
        return convertToDTO(savedBooking);
    }

    public BookingDTO updateBooking(Long id, @Valid BookingDTO bookingDTO) {
        validateBookingDates(bookingDTO);
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        updateEntityWithDTO(booking, bookingDTO);
        Booking updatedBooking = bookingRepository.save(booking);
        return convertToDTO(updatedBooking);
    }

    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        sendBookingDeletionEmail(booking);
        bookingRepository.deleteById(id);
    }

    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setUserId(booking.getUser().getId());
        dto.setRoomId(booking.getRoom().getId());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        return dto;
    }

    private Booking convertToEntity(BookingDTO dto) {
        Booking booking = new Booking();
        booking.setUser(userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found")));
        booking.setRoom(roomRepository.findById(dto.getRoomId())
            .orElseThrow(() -> new ResourceNotFoundException("Room not found")));
        booking.setCheckInDate(dto.getCheckInDate());
        booking.setCheckOutDate(dto.getCheckOutDate());
        return booking;
    }

    private void updateEntityWithDTO(Booking booking, BookingDTO dto) {
        booking.setUser(userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found")));
        booking.setRoom(roomRepository.findById(dto.getRoomId())
            .orElseThrow(() -> new ResourceNotFoundException("Room not found")));
        booking.setCheckInDate(dto.getCheckInDate());
        booking.setCheckOutDate(dto.getCheckOutDate());
    }

    private void validateBookingDates(BookingDTO bookingDTO) {
        if (bookingDTO.getCheckInDate().isAfter(bookingDTO.getCheckOutDate())) {
            throw new InvalidBookingException("Check-in date must be before check-out date");
        }
    }

    private void sendBookingConfirmationEmail(Booking booking) {
        User user = booking.getUser();
        String to = user.getEmail();
        String subject = "Booking Confirmation";
        String body = "Dear " + user.getName() + ",\n\n" +
                      "Thank you for your booking!\n\n" +
                      "Booking Details:\n" +
                      "Hotel: " + booking.getRoom().getHotel().getName() + "\n" +
                      "Room Type: " + booking.getRoom().getType() + "\n" +
                      "Check-in Date: " + booking.getCheckInDate() + "\n" +
                      "Check-out Date: " + booking.getCheckOutDate() + "\n\n" +
                      "We look forward to hosting you!\n\n" +
                      "Best regards,\n" +
                      "OHBS Team";

        emailService.sendEmail(to, subject, body);
    }

    private void sendBookingDeletionEmail(Booking booking) {
        User user = booking.getUser();
        String to = user.getEmail();
        String subject = "Booking Cancellation";
        String body = "Dear " + user.getName() + ",\n\n" +
                      "We regret to inform you that your booking has been cancelled.\n\n" +
                      "Booking Details:\n" +
                      "Hotel: " + booking.getRoom().getHotel().getName() + "\n" +
                      "Room Type: " + booking.getRoom().getType() + "\n" +
                      "Check-in Date: " + booking.getCheckInDate() + "\n" +
                      "Check-out Date: " + booking.getCheckOutDate() + "\n\n" +
                      "We hope to serve you in the future.\n\n" +
                      "Best regards,\n" +
                      "OHBS Team";

        emailService.sendEmail(to, subject, body);
    }
}
