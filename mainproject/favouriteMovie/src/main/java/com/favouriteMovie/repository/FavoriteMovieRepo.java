package com.favouriteMovie.repository;

import com.favouriteMovie.domain.Favourites;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FavoriteMovieRepo extends MongoRepository<Favourites,String> {
//    FavouriteMovie findByEmail(String email);
}
