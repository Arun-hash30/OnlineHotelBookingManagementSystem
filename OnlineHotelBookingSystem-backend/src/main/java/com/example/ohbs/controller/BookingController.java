package com.example.ohbs.controller;

import com.example.ohbs.dto.BookingDTO;
import com.example.ohbs.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

	
	@Autowired
	private BookingService bookingService;
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/getAll")
	public List<BookingDTO> getAllBookings() {
		return bookingService.getAllBookings();
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/{id}")
	public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long id) {
		return bookingService.getBookingById(id).map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@PostMapping("/create")
	public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
		try {
			BookingDTO savedBooking = bookingService.createBooking(bookingDTO);
			return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
		} catch (RuntimeException e) {
			// Log the exception for debugging purposes
			e.printStackTrace();
			// Return an appropriate HTTP response in case of an error
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@PutMapping("/{id}")
	public ResponseEntity<BookingDTO> updateBooking(@PathVariable Long id, @RequestBody BookingDTO bookingDTO) {
		BookingDTO updatedBooking = bookingService.updateBooking(id, bookingDTO);
		return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
		bookingService.deleteBooking(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}