package com.example.userauthentication.service;

import com.example.userauthentication.entity.User;
import com.example.userauthentication.exceptions.InvalidCredentialException;
import com.example.userauthentication.exceptions.UserAlreadyExistException;
import org.springframework.web.multipart.MultipartFile;

public interface UserServiceInterface {
     User signUp(User user) throws UserAlreadyExistException;
     User login(User user) throws InvalidCredentialException;
}
