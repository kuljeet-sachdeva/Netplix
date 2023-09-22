package com.example.userauthentication.security;

import com.example.userauthentication.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class SecurityTokenGeneratorImpl implements SecurityTokenGenerator {
    @Override
    public Map<String, String> generateToken(User user) {
        Map<String,Object> claims=new HashMap<>();
        claims.put("email",user.getEmail());
        claims.put("role",user.getRole());
        System.out.println(claims);
        String email=user.getEmail();
        return createToken(claims,email);
    }
    public  Map<String,String> createToken(Map<String,Object> claims,String email){
        Map<String,String> mapToken=new HashMap<>();
        String token= Jwts.builder().setIssuer("client")
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256,"mysecretkey").compact();
        mapToken.put("token",token);
        mapToken.put("role", (String) claims.get("role"));
        return mapToken;
    }
}
