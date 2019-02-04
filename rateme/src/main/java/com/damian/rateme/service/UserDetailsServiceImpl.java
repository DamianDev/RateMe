package com.damian.rateme.service;

import com.damian.rateme.dao.UserDAO;
import com.damian.rateme.model.User;
import com.damian.rateme.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserDAO userDAO;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) {
        User user = userDAO.findByUsername(username);

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadById(Long id) {
        User user = userDAO.findByUserId(id);

        return UserPrincipal.create(user);
    }

}
