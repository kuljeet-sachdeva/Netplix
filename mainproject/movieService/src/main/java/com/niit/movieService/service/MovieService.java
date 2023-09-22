package com.niit.movieService.service;

import com.niit.movieService.domain.Movie;

import com.niit.movieService.domain.User;
import com.niit.movieService.exception.UserAlreadyExistException;
import com.niit.movieService.exception.UserNotFoundException;
import com.niit.movieService.repository.MovieRepository;
import com.niit.movieService.repository.UserAuthRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovieService implements MovieServiceInterface {

    private MovieRepository movieRepo;
    private UserAuthRepo userRepository;
    @Autowired
    public MovieService(MovieRepository movieRepo, UserAuthRepo userRepository) {
        this.movieRepo = movieRepo;
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) throws UserAlreadyExistException{
        if (userRepository.findById(user.getEmail()).isPresent()){
            throw new UserAlreadyExistException();
        }
        return userRepository.save(user);
    }

    @Override
    public User getUserDetails(String email) throws UserNotFoundException {
        if (userRepository.findById(email).isEmpty()){
            throw new UserNotFoundException();
        }
        return userRepository.findById(email).get();
    }

    @Override
    public Movie addMovie(Movie movie) {
        Movie createdMovie = movieRepo.insert(movie);
        return createdMovie;
    }

    @Override
    public Movie updateMovie(Movie movie) {
        Movie updatedMovie = movieRepo.save(movie);
        return updatedMovie;
    }

    @Override
    public List<Movie> getAllMovies() {
        List<Movie> listOfMovies = movieRepo.findAll();
        return listOfMovies;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> listOfUsers = userRepository.findAll();
        return listOfUsers;
    }


    @Override
    public List<Movie> getAllMoviesByAdmin(String email) {
        List<Movie> listOfMovies = movieRepo.findByAdminEmail(email);
        return listOfMovies;
    }

    @Override
    public boolean deleteMovie(Movie movie) {
        if(movieRepo.findById(movie.getMovieId()).isPresent()){
            movieRepo.delete(movie);
            return true;
        }
        return false;
    }

    @Override
    public List<Movie> searchMovie(String search) {
        List<Movie> searchResult = new ArrayList<>();
        for (Movie movie : movieRepo.findAll()) {
            if (movie.getMovieName().toLowerCase().contains(search.toLowerCase())) {
                searchResult.add(movie);
            }
        }
        return searchResult;
    }

    @Override
    public Movie getMovie(int movieId) {
        return movieRepo.findById(movieId).get();
    }

}
