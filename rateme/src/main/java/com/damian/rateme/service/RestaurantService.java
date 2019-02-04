package com.damian.rateme.service;

import com.damian.rateme.dao.RestaurantDAO;
import com.damian.rateme.model.Restaurant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {
    private final static Logger log = LoggerFactory.getLogger(RestaurantService.class);

    private final RestaurantDAO restaurantDAO;

    @Autowired
    public RestaurantService(RestaurantDAO restaurantDAO) {
        this.restaurantDAO = restaurantDAO;
    }

    public void persistRestaurant(Restaurant restaurant) {
        log.info("Saving restaurant...");
        restaurantDAO.saveAndFlush(restaurant);
        log.info("Restaurant has been persisted!");
    }

    public Restaurant findRestaurantByRestaurantId(long restaurantId) {
        return restaurantDAO.findByRestaurantIdAndIsActive(restaurantId, true);
    }

    public List<Restaurant> findAllRestaurants() {
        return restaurantDAO.findAllByIsActive(true);
    }

}
