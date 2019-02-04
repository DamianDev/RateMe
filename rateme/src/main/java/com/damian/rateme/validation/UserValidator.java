package com.damian.rateme.validation;

import com.damian.rateme.dao.UserDAO;
import com.damian.rateme.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    @Autowired
    private UserDAO userDAO;

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        User user = (User) o;

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "username.empty");
        if (user.getUsername().length() < 6 || user.getUsername().length() > 15) {
            errors.rejectValue("username", "username.size");
        }
        if (userDAO.findByUsername(user.getUsername()) != null) {
            errors.rejectValue("username", "username.exists");
        }

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "password.empty");
        if (user.getPassword().length() < 6 || user.getPassword().length() > 30) {
            errors.rejectValue("password", "password.size");
        }
    }
}
