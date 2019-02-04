package com.damian.rateme.controller;

import com.damian.rateme.dao.RoleDAO;
import com.damian.rateme.dao.UserDAO;
import com.damian.rateme.model.Role;
import com.damian.rateme.model.User;
import com.damian.rateme.request.LoginRequest;
import com.damian.rateme.request.RegistrationRequest;
import com.damian.rateme.response.JwtAuthenticationResponse;
import com.damian.rateme.response.Response;
import com.damian.rateme.security.JwtTokenProvider;
import com.damian.rateme.util.RoleName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;

    private final UserDAO userDAO;

    private final RoleDAO roleDAO;

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenProvider tokenProvider;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, UserDAO userDAO, RoleDAO roleDAO, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userDAO = userDAO;
        this.roleDAO = roleDAO;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegistrationRequest request) {

        if(userDAO.findByUsername(request.getUsername()) != null) {
            return ResponseEntity
                    .badRequest()
                    .body(new Response(false, new String[] {"Username is already taken!"}));
        }

        Role userRole = roleDAO.findByName(RoleName.ROLE_USER);

        User user = new User(request.getUsername(), passwordEncoder.encode(request.getPassword()));
        user.setRoles(Collections.singletonList(userRole));

        User result = userDAO.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/users/{username}")
                .buildAndExpand(result.getUsername())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(new Response(true, new String[] {"User registered successfully!"}));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok().body(new JwtAuthenticationResponse(true, new String[] {"User logged in successfully"}, token));
    }
}
