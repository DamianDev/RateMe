package com.damian.rateme.service;

import com.damian.rateme.dao.RatingDAO;
import com.damian.rateme.model.Rating;
import com.damian.rateme.model.Restaurant;
import com.damian.rateme.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    private final RatingDAO ratingDAO;

    @Autowired
    public RatingService(RatingDAO ratingDAO) {
        this.ratingDAO = ratingDAO;
    }

    public List<Rating> findAllByRestaurant(Restaurant restaurant) {
        return ratingDAO.findAllByRestaurant(restaurant);
    }

    public void rate(Rating rating) {
        ratingDAO.save(rating);
    }

    public List<Rating> findAllByUser(User user) {
        return ratingDAO.findAllByUser(user);
    }
}
