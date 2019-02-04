package com.damian.rateme.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Component;
import org.springframework.validation.ObjectError;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Component
public class ValidationMessagesSource {
    private final static Logger log = LoggerFactory.getLogger(ValidationMessagesSource.class);

    private ResourceBundleMessageSource messageSource;

    public ValidationMessagesSource() {
        messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("message");
    }

    public List<String> getMessages(List<ObjectError> errors) {
        log.info("Validation failed! Retrieving error messages...");

        return errors.stream()
                .map(err -> messageSource.getMessage(err, Locale.US))
                .peek(msg -> log.error("Error: " + msg))
                .collect(Collectors.toList());
    }
}
