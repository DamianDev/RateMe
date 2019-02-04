package com.damian.rateme.dao;

import com.damian.rateme.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantDAO extends JpaRepository<Restaurant, Long> {
    Restaurant findByRestaurantIdAndIsActive(long restaurantId, boolean isActive);
    List<Restaurant> findAllByIsActive(boolean isActive);
}
