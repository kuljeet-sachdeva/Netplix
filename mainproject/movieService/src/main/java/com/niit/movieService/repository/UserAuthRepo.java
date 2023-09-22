package com.niit.movieService.repository;

import com.niit.movieService.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserAuthRepo extends MongoRepository<User,String> {

}
