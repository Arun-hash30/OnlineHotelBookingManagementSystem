package com.example.ohbs.service;

import com.example.ohbs.dto.RoomDTO;
import com.example.ohbs.model.Room;
import com.example.ohbs.repository.RoomRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ModelMapper modelMapper;
    

    // Create a new room
    public RoomDTO createRoom(RoomDTO roomDTO) {
        Room room = modelMapper.map(roomDTO, Room.class);
        Room savedRoom = roomRepository.save(room);
        return modelMapper.map(savedRoom, RoomDTO.class);
    }

    // Get a room by ID
    public Optional<RoomDTO> getRoomById(Long id) {
        return roomRepository.findById(id).map(room -> modelMapper.map(room, RoomDTO.class));
    }

    // Get all rooms
    public List<RoomDTO> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(room -> modelMapper.map(room, RoomDTO.class))
                .collect(Collectors.toList());
    }

    // Update a room
    public RoomDTO updateRoom(Long id, RoomDTO roomDTO) {
        Room roomToUpdate = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        modelMapper.map(roomDTO, roomToUpdate);
        Room updatedRoom = roomRepository.save(roomToUpdate);
        return modelMapper.map(updatedRoom, RoomDTO.class);
    }

    // Delete a room
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
    public List<RoomDTO> findRoomsByPrice(double price) {
        List<Room> rooms = roomRepository.findByPricePerNightLessThanEqual(price);
        return rooms.stream()
                .map(room -> modelMapper.map(room, RoomDTO.class))
                .collect(Collectors.toList());
    }
    
    
    public List<RoomDTO> findRoomsByHotelStarRating(int starRating) {
        List<Room> rooms = roomRepository.findByHotelStarRating(starRating);
        return rooms.stream()
                .map(room -> modelMapper.map(room, RoomDTO.class))
                .collect(Collectors.toList());
    }
    
    

    public List<RoomDTO> findRoomsByHotelAddress(String letters) {
        List<Room> rooms = roomRepository.findByHotelAddressContainingLetters(letters.toLowerCase());
        return rooms.stream()
            .map(room -> modelMapper.map(room, RoomDTO.class))
            .collect(Collectors.toList());
    }
}