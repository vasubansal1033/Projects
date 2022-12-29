package com.project.db_setup.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users", schema = "USER_APP")
public class User {
    @Id
    private Integer userID;
    private String name;
    private String email;

    @Override
    public String toString() {
        return String.format(
                "User{" +
                    "id = %s," +
                    "name = '%s'," +
                    "email = %s," +
                "}\n", userID, name, email);
    }

}
