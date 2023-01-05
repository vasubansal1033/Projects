package com.project.dtoProject.repositories;

import com.project.dtoProject.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
