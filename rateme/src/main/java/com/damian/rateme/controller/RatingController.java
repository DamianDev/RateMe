package com.damian.rateme.controller;

import com.damian.rateme.dto.RatingDTO;
import com.damian.rateme.model.Rating;
import com.damian.rateme.model.Restaurant;
import com.damian.rateme.model.User;
import com.damian.rateme.response.GetRatingsResponse;
import com.damian.rateme.response.Response;
import com.damian.rateme.security.UserPrincipal;
import com.damian.rateme.service.CurrentUser;
import com.damian.rateme.service.RatingService;
import com.damian.rateme.service.RestaurantService;
import com.damian.rateme.service.UserService;
import com.damian.rateme.util.ValidationMessagesSource;
import com.damian.rateme.validation.RateValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    private final static Logger log = LoggerFactory.getLogger(RatingController.class);

    private final RatingService ratingService;

    private final RestaurantService restaurantService;

    private final UserService userService;

    private final RateValidator rateValidator;

    private final ValidationMessagesSource validationMessagesSource;

    @Autowired
    public RatingController(RatingService ratingService, RestaurantService restaurantService, UserService userService, RateValidator rateValidator, ValidationMessagesSource validationMessagesSource) {
        this.ratingService = ratingService;
        this.restaurantService = restaurantService;
        this.userService = userService;
        this.rateValidator = rateValidator;
        this.validationMessagesSource = validationMessagesSource;
    }


    @GetMapping()
    public @ResponseBody ResponseEntity<?> getAllRatings(@RequestParam Long restaurantId) {
        log.info("Getting all ratings for restaurant...");

        if(restaurantId == null) {
            log.error("Restaurant ID is required!");
            return ResponseEntity
                    .badRequest()
                    .body(new Response(false, (new String[] {"Restaurant ID is required"})));
        }

        Restaurant restaurant = restaurantService.findRestaurantByRestaurantId(restaurantId);

        List<Rating> ratings = ratingService.findAllByRestaurant(restaurant);

        log.info("All rating retrieved!");
        return ResponseEntity.ok(new GetRatingsResponse(true, null, ratings));
    }

    @Secured("ROLE_USER")
    @PostMapping()
    public @ResponseBody ResponseEntity<?> rate(@CurrentUser UserPrincipal userPrincipal, @RequestBody RatingDTO ratingDTO, BindingResult bindingResult) {
        log.info("Rating the restaurant...");

        User user = userService.findByUserId(userPrincipal.getId());
        Restaurant restaurant = restaurantService.findRestaurantByRestaurantId(ratingDTO.getRestaurantId());

        Rating rating = Rating.builder()
                .rating(ratingDTO.getRating())
                .restaurant(restaurant)
                .user(user)
                .build();

        rateValidator.validate(rating, bindingResult);

        if(bindingResult.hasErrors()) {
            List<ObjectError> errors = bindingResult.getAllErrors();
            log.error("Validation errors occurred!", errors);

            String[] messages = validationMessagesSource
                    .getMessages(errors)
                    .toArray(new String[errors.size()]);

            return ResponseEntity
                    .badRequest()
                    .body(new Response(false, messages));
        }


        ratingService.rate(rating);

        log.info("Rating added successfully!");
        return ResponseEntity
                .ok()
                .body(new Response(true, new String[] {"You have successfully rated the restaurant!"}));
    }

}
