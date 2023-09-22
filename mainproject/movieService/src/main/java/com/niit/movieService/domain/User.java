package com.niit.movieService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User {
    @Id
    private String email;
    private String name;
    private long mobile;
    private byte[] profilePic;
    private String city;
    private String address;
    private String password;
    private String role;
}
