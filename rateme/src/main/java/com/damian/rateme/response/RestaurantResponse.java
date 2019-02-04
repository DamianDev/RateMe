package com.damian.rateme.response;


import com.damian.rateme.model.Restaurant;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class RestaurantResponse extends Response {
    private Restaurant restaurant;

    public RestaurantResponse(Boolean success, String[] messages, Restaurant restaurant) {
        super(success, messages);
        this.restaurant = restaurant;
    }
}
