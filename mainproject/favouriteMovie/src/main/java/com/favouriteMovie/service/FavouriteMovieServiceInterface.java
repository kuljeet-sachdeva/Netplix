package com.favouriteMovie.service;

import com.favouriteMovie.domain.Movie;

import java.util.List;

public interface FavouriteMovieServiceInterface {
      List<Movie> getAllFavouriteMovies(String email);
      boolean addFavoriteMovie(Movie movie, String email);
      boolean deleteFavoriteMovie(Movie movie,String email);
}
