package com.example.ohbs.service.impl;

import com.example.ohbs.dto.HotelDTO;
import com.example.ohbs.model.Hotel;
import com.example.ohbs.repository.HotelRepository;
import com.example.ohbs.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HotelServiceImpl implements HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public HotelDTO createHotel(HotelDTO hotelDTO) {
        Hotel hotel = convertToEntity(hotelDTO);
        Hotel savedHotel = hotelRepository.save(hotel);
        return convertToDTO(savedHotel);
    }

    @Override
    public HotelDTO updateHotel(Long id, HotelDTO hotelDTO) {
        Optional<Hotel> hotelOptional = hotelRepository.findById(id);
        if (hotelOptional.isPresent()) {
            Hotel hotel = hotelOptional.get();
            hotel.setName(hotelDTO.getName());
            hotel.setAddress(hotelDTO.getAddress());
            hotel.setContact(hotelDTO.getContact());
            hotel.setDescription(hotelDTO.getDescription());
            hotel.setAmenities(hotelDTO.getAmenities());
            hotel.setStarRating(hotelDTO.getStarRating());
            hotel.setImages(hotelDTO.getImages());
            Hotel updatedHotel = hotelRepository.save(hotel);
            return convertToDTO(updatedHotel);
        }
        return null;
    }

    @Override
    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }

    @Override
    public HotelDTO getHotelById(Long id) {
        Optional<Hotel> hotelOptional = hotelRepository.findById(id);
        return hotelOptional.map(this::convertToDTO).orElse(null);
    }

    @Override
    public List<HotelDTO> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        return hotels.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private HotelDTO convertToDTO(Hotel hotel) {
        HotelDTO hotelDTO = new HotelDTO();
        hotelDTO.setId(hotel.getId());
        hotelDTO.setName(hotel.getName());
        hotelDTO.setAddress(hotel.getAddress());
        hotelDTO.setContact(hotel.getContact());
        hotelDTO.setDescription(hotel.getDescription());
        hotelDTO.setAmenities(hotel.getAmenities());
        hotelDTO.setStarRating(hotel.getStarRating());
        hotelDTO.setImages(hotel.getImages());
        return hotelDTO;
    }

    private Hotel convertToEntity(HotelDTO hotelDTO) {
        Hotel hotel = new Hotel();
        hotel.setName(hotelDTO.getName());
        hotel.setAddress(hotelDTO.getAddress());
        hotel.setContact(hotelDTO.getContact());
        hotel.setDescription(hotelDTO.getDescription());
        hotel.setAmenities(hotelDTO.getAmenities());
        hotel.setStarRating(hotelDTO.getStarRating());
        hotel.setImages(hotelDTO.getImages());
        return hotel;
    }

	
}