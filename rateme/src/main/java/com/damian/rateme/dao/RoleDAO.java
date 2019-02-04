package com.damian.rateme.dao;

import com.damian.rateme.model.Role;
import com.damian.rateme.util.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDAO extends JpaRepository<Role, Long> {
    Role findByName(RoleName name);
}
