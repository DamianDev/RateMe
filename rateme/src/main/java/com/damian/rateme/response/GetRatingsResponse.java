package com.damian.rateme.response;

import com.damian.rateme.model.Rating;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class GetRatingsResponse extends Response {
    private List<Rating> ratings;

    public GetRatingsResponse(Boolean success, String[] messages, List<Rating> ratings) {
        super(success, messages);
        this.ratings = ratings;
    }
}
