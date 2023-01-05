package com.project.dtoProject.services;

import com.project.dtoProject.dto.UserLocationDTO;
import com.project.dtoProject.models.User;
import com.project.dtoProject.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<UserLocationDTO> getAllUsersLocation() {
        return userRepository.findAll()
                .stream()
                .map(this::convertEntityToDTO)
                .collect(Collectors.toList());
    }
//    private UserLocationDTO convertEntityToDTO(User user) {
//        UserLocationDTO userLocationDTO = new UserLocationDTO();
//        userLocationDTO.setUserId(user.getId());
//        userLocationDTO.setEmail(user.getEmail());
//        userLocationDTO.setPlace(user.getLocation().getPlace());
//        userLocationDTO.setLongitude(user.getLocation().getLongitude());
//        userLocationDTO.setLatitude(user.getLocation().getLatitude());
//
//        return userLocationDTO;
//    }

    private UserLocationDTO convertEntityToDTO(User user) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        UserLocationDTO userLocationDTO = new UserLocationDTO();
        userLocationDTO = modelMapper.map(user, UserLocationDTO.class);
        return userLocationDTO;
    }

}
