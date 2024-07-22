package com.example.ohbs.repository;

import com.example.ohbs.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

	// Additional query methods can be defined here if needed
		  List<Room> findByPricePerNightLessThanEqual(double price);
		  @Query("SELECT r FROM Room r WHERE r.hotel.starRating = :starRating")
		    List<Room> findByHotelStarRating(@Param("starRating") int starRating);

		    @Query("SELECT r FROM Room r WHERE LOWER(r.hotel.address) LIKE %:letters%")
		    List<Room> findByHotelAddressContainingLetters(@Param("letters") String letters);
}