package com.damian.rateme.validation;

import com.damian.rateme.model.Restaurant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
public class AddRestaurantValidator implements Validator {

    private final static Logger log = LoggerFactory.getLogger(AddRestaurantValidator.class);

    @Override
    public boolean supports(Class<?> aClass) {
        return Restaurant.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        log.info("Restaurant validation started.");
        Restaurant restaurant = (Restaurant) o;

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "name.empty");
        if(restaurant.getName().length() < 3 || restaurant.getName().length() > 30) {
            errors.rejectValue("name", "name.size");
        }

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "address", "address.empty");
        if(restaurant.getAddress().length() < 10 || restaurant.getAddress().length() > 30) {
            errors.rejectValue("address", "address.size");
        }

        if(restaurant.getDescription().length() > 100) {
            errors.rejectValue("description", "description.size");
        }
    }
}
