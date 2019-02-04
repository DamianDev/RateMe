package com.damian.rateme.service;

import com.damian.rateme.model.User;

public interface UserService {
    void save(User user);
    User findByUsername(String username);
    User findByUserId(Long userId);
}