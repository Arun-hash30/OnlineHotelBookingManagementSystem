package com.example.ohbs.controller;

import com.example.ohbs.dto.RoomDTO;
import com.example.ohbs.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Create a new room
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/create")
    public ResponseEntity<RoomDTO> createRoom(@RequestBody RoomDTO roomDTO) {
        RoomDTO createdRoom = roomService.createRoom(roomDTO);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }

    // Get a room by ID
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{id}")
    public ResponseEntity<RoomDTO> getRoomById(@PathVariable Long id) {
        Optional<RoomDTO> roomDTO = roomService.getRoomById(id);
        return roomDTO.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all rooms
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/getAll")
    public ResponseEntity<List<RoomDTO>> getAllRooms() {
        List<RoomDTO> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    // Update a room
    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/{id}")
    public ResponseEntity<RoomDTO> updateRoom(@PathVariable Long id, @RequestBody RoomDTO roomDTO) {
        RoomDTO updatedRoom = roomService.updateRoom(id, roomDTO);
        return ResponseEntity.ok(updatedRoom);
    }

    // Delete a room
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/price/{price}")
    public ResponseEntity<List<RoomDTO>> getRoomsByPrice(@PathVariable double price) {
        List<RoomDTO> rooms = roomService.findRoomsByPrice(price);
        return ResponseEntity.ok(rooms);
    }
   
    @GetMapping("/rating/{starRating}")
    public ResponseEntity<List<RoomDTO>> getRoomsByHotelStarRating(@PathVariable int starRating) {
        List<RoomDTO> rooms = roomService.findRoomsByHotelStarRating(starRating);
        return ResponseEntity.ok(rooms);
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/hotel-address/{letters}")
    public ResponseEntity<List<RoomDTO>> getRoomsByHotelAddress(@PathVariable String letters) {
        List<RoomDTO> rooms = roomService.findRoomsByHotelAddress(letters);
        return ResponseEntity.ok(rooms);
    }
}