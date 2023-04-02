package com.project.db_setup.repositories;

import com.project.db_setup.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByName(String name);

    User findByNameAndEmail(String name, String email);

    List<User> findAll();

}
