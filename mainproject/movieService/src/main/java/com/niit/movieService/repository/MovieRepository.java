package com.niit.movieService.repository;

import com.niit.movieService.domain.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface MovieRepository extends MongoRepository<Movie,Integer> {
    List<Movie> findByAdminEmail(String adminEmail);
}
