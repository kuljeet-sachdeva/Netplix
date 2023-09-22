package com.favouriteMovie.service;


import com.favouriteMovie.config.MovieDTO;
import com.favouriteMovie.domain.Favourites;
import com.favouriteMovie.domain.Movie;
import com.favouriteMovie.repository.FavoriteMovieRepo;
import com.favouriteMovie.repository.MovieRepository;
import org.json.simple.JSONObject;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
@Service
public class FavouriteMovieService implements FavouriteMovieServiceInterface {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Autowired
    private DirectExchange exchange;

    private FavoriteMovieRepo favouriteMovieRepo;
    private MovieRepository movieRepository;
    @Autowired
    public FavouriteMovieService(FavoriteMovieRepo favouriteMovieRepo,MovieRepository movieRepository) {
        this.favouriteMovieRepo = favouriteMovieRepo;
        this.movieRepository = movieRepository;
    }

    @Override
    public List<Movie> getAllFavouriteMovies(String email) {
        Favourites favMovies = favouriteMovieRepo.findById(email).get();
        List<Movie> favMovieIds = favMovies.getFavouriteMovies();
        return favMovieIds;
    }

    @Override
    public boolean addFavoriteMovie(Movie movie, String email) {
        Favourites favMovie = new Favourites();
        List<Movie> favMovies = new ArrayList<>();
        if(favouriteMovieRepo.findById(email).isEmpty()){
            favMovie.setEmail(email);
            favMovies.add(movie);
            favMovie.setFavouriteMovies(favMovies);
            System.out.println("favMovie if");
            System.out.println(favMovie);
        }else{
            favMovie = favouriteMovieRepo.findById(email).get();
            if(favMovie.getFavouriteMovies() != null){
                favMovies = favMovie.getFavouriteMovies();
            }
            favMovies.add(movie);
            favMovie.setFavouriteMovies(favMovies);
            System.out.println("favMovie else");
            System.out.println(favMovie);
        }
        favouriteMovieRepo.save(favMovie);
        MovieDTO movieDTO = new MovieDTO();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("movieCategory", movie.getCategory());
        jsonObject.put("email", email);
        movieDTO.setJsonObject(jsonObject);
        rabbitTemplate.convertAndSend(exchange.getName(), "movie-route", movieDTO);
        return true;
    }

    @Override
    public boolean deleteFavoriteMovie(Movie movie, String email) {
        Favourites favMovie = favouriteMovieRepo.findById(email).get();
        if(favMovie != null){
            favMovie.getFavouriteMovies().remove(movie);
            System.out.println("========================================");
            System.out.println(favMovie);
            //Again Saving
            favouriteMovieRepo.save(favMovie);
        }
        return true;
    }
}
