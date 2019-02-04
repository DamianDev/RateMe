package com.damian.rateme.response;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class JwtAuthenticationResponse extends Response {
    private String tokenType = "Bearer";
    private String accessToken;

    public JwtAuthenticationResponse(boolean success, String[] messages, String accessToken) {
        super(success, messages);
        this.accessToken = accessToken;
    }
}
