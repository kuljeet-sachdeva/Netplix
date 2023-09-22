package com.recommendation.controller;

import com.recommendation.service.RecommendationServiceImpl;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v4")
public class RecommendationController {
    private final RecommendationServiceImpl recommendationService;
    private ResponseEntity<?> responseEntity;
    @Autowired
    public RecommendationController(RecommendationServiceImpl recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/recommendations")
    public ResponseEntity<?> getRecommendationMovies(HttpServletRequest request) {
        try{
            Claims claims = (Claims) request.getAttribute("claims");
            String email = claims.getSubject();
            responseEntity = new ResponseEntity<>(recommendationService.getRecommendation(email), HttpStatus.OK);
        }catch(Exception e)
        {
            throw new RuntimeException(e);
        }
        return responseEntity;
    }

//    @PostMapping("/recommendations")
//    public ResponseEntity<?> saveRecommendationMovies(@RequestBody RecommendationRequest catObj , HttpServletRequest request) {
//        try{
//            Claims claims = (Claims) request.getAttribute("claims");
//            String email = claims.getSubject();
//            responseEntity = new ResponseEntity<>(recommendationService.saveRecommendation(email,catObj.getCategory()), HttpStatus.OK);
//        }catch(Exception e)
//        {
//            throw new RuntimeException(e);
//        }
//        return responseEntity;
//    }

    @DeleteMapping("/recommendations")
    public ResponseEntity<?> clearRecommendationMovies(HttpServletRequest request) {
        try{
            Claims claims = (Claims) request.getAttribute("claims");
            String email = claims.getSubject();
            responseEntity = new ResponseEntity<>(recommendationService.clearRecommendationList(email), HttpStatus.OK);
        }catch(Exception e)
        {
            throw new RuntimeException(e);
        }
        return responseEntity;
    }

}
