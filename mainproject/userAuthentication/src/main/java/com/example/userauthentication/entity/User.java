package com.example.userauthentication.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="customers_table")
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
