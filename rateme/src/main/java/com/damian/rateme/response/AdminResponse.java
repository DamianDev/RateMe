package com.damian.rateme.response;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class AdminResponse extends Response {

    private boolean isAdmin;

    public AdminResponse(boolean success, String[] messages, boolean isAdmin) {
        super(success, messages);
        this.isAdmin = isAdmin;
    }

}
