package com.project.dtoProject.repositories;

import com.project.dtoProject.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {

}
