package com.example.ohbs.service;

import com.example.ohbs.dto.HotelDTO;

import java.util.List;

public interface HotelService {
    HotelDTO createHotel(HotelDTO hotelDTO);
    HotelDTO updateHotel(Long id, HotelDTO hotelDTO);
    void deleteHotel(Long id);
    HotelDTO getHotelById(Long id);
    List<HotelDTO> getAllHotels();
}