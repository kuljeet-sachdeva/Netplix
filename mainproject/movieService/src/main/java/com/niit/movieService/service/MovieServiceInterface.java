package com.niit.movieService.service;

import com.niit.movieService.domain.Movie;
import com.niit.movieService.domain.User;
import com.niit.movieService.exception.UserAlreadyExistException;
import com.niit.movieService.exception.UserNotFoundException;

import java.util.List;

public interface MovieServiceInterface {
    User registerUser(User user) throws UserAlreadyExistException;
    User getUserDetails(String email) throws UserNotFoundException;
    Movie addMovie(Movie movie);
    Movie updateMovie(Movie movie);
    List<Movie> getAllMovies();
    List<User> getAllUsers();
    List<Movie> getAllMoviesByAdmin(String email);
    boolean deleteMovie(Movie movie);
    List<Movie> searchMovie(String search);
    Movie getMovie(int movieId);
}
