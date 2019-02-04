package com.damian.rateme.controller;

import com.damian.rateme.model.Restaurant;
import com.damian.rateme.response.GetRestaurantsResponse;
import com.damian.rateme.response.Response;
import com.damian.rateme.response.RestaurantResponse;
import com.damian.rateme.service.RestaurantService;
import com.damian.rateme.util.ResponseUtil;
import com.damian.rateme.validation.AddRestaurantValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final static Logger log = LoggerFactory.getLogger(RatingController.class);

    private final RestaurantService restaurantService;

    private final AddRestaurantValidator addRestaurantValidator;

    @Autowired
    public RestaurantController(RestaurantService restaurantService, AddRestaurantValidator addRestaurantValidator) {
        this.restaurantService = restaurantService;
        this.addRestaurantValidator = addRestaurantValidator;
    }

    @GetMapping()
    public @ResponseBody ResponseEntity<?> getRestaurants() {
        List<Restaurant> restaurants = restaurantService.findAllRestaurants();

        return ResponseEntity.ok(new GetRestaurantsResponse(true, null, restaurants));
    }

    @GetMapping(value = "/{restaurantId}")
    public @ResponseBody ResponseEntity<?> get(@PathVariable String restaurantId) {
        if(restaurantId == null) {
            return ResponseEntity.ok().body(new Response(true, null));
        }

        Restaurant restaurant = restaurantService.findRestaurantByRestaurantId(Long.parseLong(restaurantId));

        return ResponseEntity.ok().body(new RestaurantResponse(true, null, restaurant));
    }

    @Secured("ROLE_ADMIN")
    @PostMapping()
    public @ResponseBody ResponseEntity<?> create(@RequestBody Restaurant restaurant, BindingResult bindingResult) {
        log.info("Method responsible for adding a restaurant has been invoked!");

        addRestaurantValidator.validate(restaurant, bindingResult);

        if(bindingResult.hasErrors()) {
            return ResponseUtil.badRequest(bindingResult);
        }

        restaurantService.persistRestaurant(restaurant);

        return ResponseEntity.ok(new Response(true, new String[] {"Restaurant has been added!"}));
    }

    @Secured("ROLE_ADMIN")
    @PutMapping()
    public @ResponseBody ResponseEntity<?> edit(@RequestBody Restaurant restaurant, BindingResult bindingResult) {
        log.info("Method responsible for editing a restaurant has been invoked!");
        Restaurant target;

        if(restaurant.getRestaurantId() != null) {
            target = restaurantService.findRestaurantByRestaurantId(restaurant.getRestaurantId());
        }
        else {
            return ResponseEntity.badRequest().body(new Response(false, new String[] {"Restaurant ID is required"}));
        }

        if(target == null) {
            log.error("The restaurant you are trying to edit does not exist!");
            return ResponseEntity.badRequest().body(new Response(false, new String[] {"The restaurant you are trying to edit does not exist!"}));
        }
        else if (!target.isActive()) {
            return ResponseEntity.badRequest().body(new Response(false, new String[] {"The restaurant you are trying to edit is not active!"}));
        }
        else {
            rewriteRestaurant(target, restaurant);
            addRestaurantValidator.validate(target, bindingResult);
        }


        if(bindingResult.hasErrors()) {
            return ResponseUtil.badRequest(bindingResult);
        }

        restaurantService.persistRestaurant(target);


        return ResponseEntity.ok(new Response(true, new String[] {"Restaurant has been edited!"}));
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping()
    public @ResponseBody ResponseEntity<?> delete(@RequestBody Restaurant restaurant) {

        if(restaurant.getRestaurantId() == null) {
            return ResponseEntity.badRequest().body(new Response(false, new String[] {"Please provide id of the restaurant"}));
        }

        Restaurant original = restaurantService.findRestaurantByRestaurantId(restaurant.getRestaurantId());
        original.setActive(false);

        restaurantService.persistRestaurant(original);

        return ResponseEntity.ok().body(new Response(true, new String[] {"Restaurant has been deleted"}));
    }

    private void rewriteRestaurant(Restaurant target, Restaurant source) {
        if(source.getDescription() != null) target.setDescription(source.getDescription());
        if(source.getAddress() != null) target.setAddress(source.getAddress());
        if(source.getName() != null) target.setName(source.getName());
    }

}
