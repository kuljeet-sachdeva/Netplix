package com.favouriteMovie.repository;

import com.favouriteMovie.domain.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MovieRepository extends MongoRepository<Movie,Integer> {
}
