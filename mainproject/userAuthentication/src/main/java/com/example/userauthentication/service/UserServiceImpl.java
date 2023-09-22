package com.example.userauthentication.service;

import com.example.userauthentication.entity.User;
import com.example.userauthentication.exceptions.InvalidCredentialException;
import com.example.userauthentication.exceptions.UserAlreadyExistException;
import com.example.userauthentication.proxy.UserProxy;
import com.example.userauthentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class UserServiceImpl implements UserServiceInterface  {
    private UserRepository userRepository;
    private UserProxy userProxy;
    private final String uploadDir = System.getProperty("java.io.tmpdir");
    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserProxy userProxy) {
        this.userRepository = userRepository;
        this.userProxy = userProxy;
    }

    @Override
    public User signUp(User user) throws UserAlreadyExistException  {
        if (userRepository.findById(user.getEmail()).isPresent()){
            throw new UserAlreadyExistException();
        }
        if (user.getEmail().isEmpty()){
            throw new RuntimeException("Error the email is empty ot invalid.");
        }
        userProxy.registerUser(user);
        return userRepository.save(user);
    }

    @Override
    public User login(User user) throws InvalidCredentialException {
        User userFromDb=userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if (userFromDb == null)
        {
            throw new InvalidCredentialException();
        }
        return userFromDb;
    }


}
