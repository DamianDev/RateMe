package com.damian.rateme.controller;

import com.damian.rateme.model.User;
import com.damian.rateme.response.AdminResponse;
import com.damian.rateme.security.UserPrincipal;
import com.damian.rateme.service.CurrentUser;
import com.damian.rateme.service.UserService;
import com.damian.rateme.util.RoleName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public @ResponseBody ResponseEntity<?> isAdmin(@CurrentUser UserPrincipal userPrincipal) {
        boolean isAdmin = false;

        if(userPrincipal != null) {
            User user = userService.findByUserId(userPrincipal.getId());
            isAdmin = user.getRoles().stream().anyMatch(r -> r.getName().equals(RoleName.ROLE_ADMIN));
        }

        return ResponseEntity.ok(new AdminResponse(true, null, isAdmin));
    }
}
