package com.example.ohbs.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @Column(name = "number_available", nullable = false)
    private Integer numberAvailable;

    @Column(name = "price_per_night", nullable = false)
    private double pricePerNight; // Changed to double

    @Column(name = "type", nullable = false)
    private String type;

    @ElementCollection
    private List<String> images;

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", hotel=" + hotel +
                ", numberAvailable=" + numberAvailable +
                ", pricePerNight=" + pricePerNight +
                ", type='" + type + '\'' +
                ", images=" + images +
                '}';
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}

	public Integer getNumberAvailable() {
		return numberAvailable;
	}

	public void setNumberAvailable(Integer numberAvailable) {
		this.numberAvailable = numberAvailable;
	}

	public double getPricePerNight() {
		return pricePerNight;
	}

	public void setPricePerNight(double pricePerNight) {
		this.pricePerNight = pricePerNight;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}
    
}