package com.damian.rateme.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingDTO {
    private Long userId;
    private Long restaurantId;

    private int rating;
}
