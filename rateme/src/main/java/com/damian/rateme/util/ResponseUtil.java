package com.damian.rateme.util;

import com.damian.rateme.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.List;

@Component
public class ResponseUtil {

    private static ValidationMessagesSource validationMessagesSource;

    @Autowired
    public ResponseUtil(ValidationMessagesSource validationMessagesSource) {
        ResponseUtil.validationMessagesSource = validationMessagesSource;
    }

    public static ResponseEntity<?> badRequest(BindingResult bindingResult) {
        List<ObjectError> errors = bindingResult.getAllErrors();

        String[] messages = validationMessagesSource
                .getMessages(errors)
                .toArray(new String[errors.size()]);

        return ResponseEntity
                .badRequest()
                .body(new Response(false, messages));
    }
}
