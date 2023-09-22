package com.example.userauthentication.proxy;

import com.example.userauthentication.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(value = "movie-container",url = "http://movie-container:8082")
public interface UserProxy {
        @PostMapping("/api/register")
        public ResponseEntity<?> registerUser(@RequestBody User user);

}
