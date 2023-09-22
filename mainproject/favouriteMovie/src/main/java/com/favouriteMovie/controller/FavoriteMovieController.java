package com.favouriteMovie.controller;

import com.favouriteMovie.domain.Movie;
import com.favouriteMovie.service.FavouriteMovieService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/v3/favourite")
public class FavoriteMovieController {
    private FavouriteMovieService favMovieService;
    private ResponseEntity<?> responseEntity;
    @Autowired
    public FavoriteMovieController(FavouriteMovieService favMovieService) {
        this.favMovieService = favMovieService;
    }

    @GetMapping("/movies")
    public ResponseEntity<?> getAllFavouriteMovies(HttpServletRequest request){
        try{
            Claims claims = (Claims) request.getAttribute("claims");
            String email = claims.getSubject();
            responseEntity = new ResponseEntity<>(favMovieService.getAllFavouriteMovies(email), HttpStatus.OK);
        }catch(Exception e){
            throw new RuntimeException(e);
        }
        return responseEntity;
    }

    @PostMapping("/movie/add")
    public ResponseEntity<?> addFavoriteMovie(@RequestBody Movie movie, HttpServletRequest request){
        try{
            Claims claims = (Claims) request.getAttribute("claims");
            String email = claims.getSubject();
            System.out.println("----------------------------------------------------");
            System.out.println(email);
            responseEntity = new ResponseEntity<>(favMovieService.addFavoriteMovie(movie,email),HttpStatus.CREATED);
        }catch(Exception e){
            throw new RuntimeException(e);
        }
        return responseEntity;
    }
    @PostMapping("/movie/remove")
    public ResponseEntity<?> deleteFavoriteMovie(@RequestBody Movie movie,HttpServletRequest request){
        try{
            Claims claims = (Claims) request.getAttribute("claims");
            String email =claims.getSubject();
            responseEntity = new ResponseEntity<>(favMovieService.deleteFavoriteMovie(movie,email),HttpStatus.OK);
        }catch(Exception e){
            throw new RuntimeException(e);
        }
        return responseEntity;
    }


}
