package com.niit.movieService.controller;

import com.niit.movieService.domain.Movie;
import com.niit.movieService.domain.User;
import com.niit.movieService.exception.UserAlreadyExistException;
import com.niit.movieService.service.MovieService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200/")
public class MovieController {
    private MovieService movieService;
    private ResponseEntity<?> responseEntity;
    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> signUp(@RequestBody User user) throws UserAlreadyExistException {
        return new ResponseEntity<>(movieService.registerUser(user),HttpStatus.OK);
    }

    @GetMapping("/v2/user")
    public ResponseEntity<?> getUserDetails(HttpServletRequest request) {
        try{
            Claims claims = (Claims) request.getAttribute("claims");
            String email = claims.getSubject();
            responseEntity = new ResponseEntity<>(movieService.getUserDetails(email),HttpStatus.OK);
        }catch(Exception e) {
            throw new RuntimeException(e);
        }
        return responseEntity;
    }

    @GetMapping("/v2/admin/users")
    public ResponseEntity<?> getAllUsers(){
        try{
            responseEntity = new ResponseEntity<>(movieService.getAllUsers(),HttpStatus.OK);
        }catch(Exception e) {
            throw new RuntimeException(e);
        }
        return responseEntity;
    }

    @GetMapping("/v2/admin/movies")
    public ResponseEntity<?> getAllAdminMovies(HttpServletRequest request){
        try{
            Claims claims = (Claims) request.getAttribute("claims");
            String email = claims.getSubject();
            responseEntity = new ResponseEntity<>(movieService.getAllMoviesByAdmin(email),HttpStatus.OK);
        }catch(Exception e) {
            throw new RuntimeException(e);
        }
        return responseEntity;
    }

    @GetMapping("/v2/movies")
    public ResponseEntity<?> getAllMovies(HttpServletRequest request){
        try{
            Claims claims = (Claims) request.getAttribute("claims");
            String email = claims.getSubject();
            responseEntity = new ResponseEntity<>(movieService.getAllMovies(),HttpStatus.OK);
        }catch(Exception e) {
            throw new RuntimeException(e);
        }
        return responseEntity;
    }

    @GetMapping("/v2/movie/{movieId}")
    public ResponseEntity<?> getAllMovies(@PathVariable int movieId){
        try{
            responseEntity = new ResponseEntity<>(movieService.getMovie(movieId),HttpStatus.OK);
        }catch(Exception e) {
            throw new RuntimeException(e);
        }
        return responseEntity;
    }

    @PostMapping("/v2/admin/movie")
    public ResponseEntity<?> addMovie(@RequestBody Movie movie,HttpServletRequest request){
        try{
            Claims claims = (Claims) request.getAttribute("claims");
            String email = claims.getSubject();
            movie.setAdminEmail(email);
            responseEntity = new ResponseEntity<>(movieService.addMovie(movie),HttpStatus.CREATED);
        }catch(Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
        return responseEntity;
    }

    @PutMapping("/v2/admin/movie")
    public ResponseEntity<?> updateMovie(@RequestBody Movie movie,HttpServletRequest request){
        try{
            Claims claims = (Claims) request.getAttribute("claims");
            System.out.println(claims);
            String email = claims.getSubject();
            System.out.println(email);
            movie.setAdminEmail(email);
            responseEntity = new ResponseEntity<>(movieService.updateMovie(movie),HttpStatus.OK);
        }catch(Exception e) {
            throw new RuntimeException(e);
        }
        return responseEntity;
    }

    @PostMapping("/v2/admin/movie/delete")
    public ResponseEntity<?> deleteMovie(@RequestBody Movie movie){
        try{
            responseEntity = new ResponseEntity<>(movieService.deleteMovie(movie),HttpStatus.OK);
        }catch(Exception e) {
            throw new RuntimeException(e);
        }
        return responseEntity;
    }

    @PostMapping("/v2/search")
    public ResponseEntity<?> searchMovie(@RequestBody String search){
        try{
            responseEntity = new ResponseEntity<>(movieService.searchMovie(search),HttpStatus.OK);
        }catch(Exception e) {
            throw new RuntimeException(e);
        }
        return responseEntity;
    }

}
