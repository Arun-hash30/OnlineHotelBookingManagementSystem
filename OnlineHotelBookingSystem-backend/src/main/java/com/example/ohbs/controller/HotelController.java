package com.example.ohbs.controller;

import com.example.ohbs.dto.HotelDTO;
import com.example.ohbs.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotels")
public class HotelController {

	@Autowired
	private HotelService hotelService;

	@CrossOrigin(origins = "http://localhost:5173")
	@PostMapping("/create")
	public ResponseEntity<HotelDTO> createHotel(@RequestBody HotelDTO hotelDTO) {
		HotelDTO createdHotel = hotelService.createHotel(hotelDTO);
		return ResponseEntity.ok(createdHotel);
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@PutMapping("/{id}")
	public ResponseEntity<HotelDTO> updateHotel(@PathVariable Long id, @RequestBody HotelDTO hotelDTO) {
		HotelDTO updatedHotel = hotelService.updateHotel(id, hotelDTO);
		if (updatedHotel != null) {
			return ResponseEntity.ok(updatedHotel);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
		hotelService.deleteHotel(id);
		return ResponseEntity.noContent().build();
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/{id}")
	public ResponseEntity<HotelDTO> getHotelById(@PathVariable Long id) {
		HotelDTO hotel = hotelService.getHotelById(id);
		if (hotel != null) {
			return ResponseEntity.ok(hotel);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/getAll")
	@CrossOrigin(origins = "http://localhost:5173")
	public ResponseEntity<List<HotelDTO>> getAllHotels() {
		List<HotelDTO> hotels = hotelService.getAllHotels();
		return ResponseEntity.ok(hotels);
	}
}