package com.example.userauthentication.security;

import com.example.userauthentication.entity.User;

import java.util.Map;

public interface SecurityTokenGenerator {
   Map<String,String> generateToken(User user);

}
