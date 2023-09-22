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
public class Movie {
    @Id
    private int movieId;
    private String movieName;
    private String category;
    private String description;
    private byte[]  moviePic;
    private double ratings;
    private String adminEmail;
}