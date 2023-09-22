package com.recommendation.service;

import com.recommendation.config.MovieDTO;
import com.recommendation.domain.Recommendation;

public interface RecommendationService {
    void saveRecommendation(MovieDTO movieDTO);
//    Recommendation saveRecommendation(String email,String category);
    Recommendation getRecommendation(String email);
    Recommendation clearRecommendationList(String email);
}
