package com.damian.rateme.validation;

import com.damian.rateme.model.Rating;
import com.damian.rateme.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.List;

@Component
public class RateValidator implements Validator {

    private final RatingService ratingService;

    @Autowired
    public RateValidator(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return Rating.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Rating rating = (Rating) o;

        if (rating.getUser() == null) {
            errors.rejectValue("user", "user.notExist");
        }

        if (rating.getRestaurant() == null) {
            errors.rejectValue("restaurant", "restaurant.notExist");
        }

        List<Rating> ratings = ratingService.findAllByUser(rating.getUser());
        if(ratings.stream().map(r -> r.getRestaurant().getRestaurantId()).anyMatch(e -> e.equals(rating.getRestaurant().getRestaurantId()))) {
            errors.rejectValue("rating", "rating.exists");
        }

        if(rating.getRating() < 1 || rating.getRating() > 5) {
            errors.rejectValue("rating", "rating.value");
        }

    }
}
