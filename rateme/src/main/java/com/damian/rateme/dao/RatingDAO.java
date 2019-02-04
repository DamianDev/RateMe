package com.damian.rateme.dao;

import com.damian.rateme.model.Rating;
import com.damian.rateme.model.Restaurant;
import com.damian.rateme.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingDAO extends JpaRepository<Rating, Long> {
    List<Rating> findAllByRestaurant(Restaurant restaurant);
    List<Rating> findAllByUser(User user);
}
