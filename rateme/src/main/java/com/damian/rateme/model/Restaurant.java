package com.damian.rateme.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "RESTAURANT")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long restaurantId;
    private String name;
    private String address;
    private String description;
    private boolean isActive = true;

    @OneToMany(mappedBy = "restaurant")
    private List<Rating> ratings = new ArrayList<>();
}
