package com.damian.rateme.response;

import com.damian.rateme.model.Restaurant;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class GetRestaurantsResponse extends Response {
    private List<Restaurant> restaurants;

    public GetRestaurantsResponse(Boolean success, String[] messages, List<Restaurant> restaurants) {
        super(success, messages);
        this.restaurants = restaurants;
    }
}
