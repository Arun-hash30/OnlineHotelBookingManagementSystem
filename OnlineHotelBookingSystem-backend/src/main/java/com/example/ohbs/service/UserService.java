package com.example.ohbs.service;

import com.example.ohbs.dto.LoginDTO;
import com.example.ohbs.dto.UserDTO;
import com.example.ohbs.model.User;
import com.example.ohbs.response.LoginMessage;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User createUser(User user);
    User updateUser(Long id, User userDetails);
    void deleteUser(Long id);
    LoginMessage loginUser(LoginDTO loginDTO);
}
