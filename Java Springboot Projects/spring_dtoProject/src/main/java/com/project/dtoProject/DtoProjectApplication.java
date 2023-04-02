package com.project.dtoProject;

import com.project.dtoProject.models.Location;
import com.project.dtoProject.models.User;
import com.project.dtoProject.repositories.LocationRepository;
import com.project.dtoProject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.modelmapper.ModelMapper;

@SpringBootApplication
public class DtoProjectApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(DtoProjectApplication.class, args);
	}

	@Autowired
	private UserRepository userRepository;

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Autowired
	private LocationRepository locationRepository;

	@Override
	public void run(String... args) throws Exception {
		Location location = new Location();
		location.setPlace("Bathinda");
		location.setDescription("Bathinda is my home city");
		location.setLongitude(90.7);
		location.setLatitude(12.2);
		locationRepository.save(location);

		User user1 = new User();
		user1.setFirstName("Vasu");
		user1.setLastName("Bansal");
		user1.setEmail("vasubansal1998@gmail.com");
		user1.setPassword("123123");
		user1.setLocation(location);
		userRepository.save(user1);

		User user2 = new User();
		user2.setFirstName("Parv");
		user2.setLastName("Bansal");
		user2.setEmail("parvbansal1998@gmail.com");
		user2.setPassword("987987");
		user2.setLocation(location);
		userRepository.save(user2);
	}
}
