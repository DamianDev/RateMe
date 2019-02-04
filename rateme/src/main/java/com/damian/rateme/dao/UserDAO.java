package com.damian.rateme.dao;

import com.damian.rateme.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDAO extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByUserId(Long userId);
}
