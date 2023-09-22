package com.recommendation.repository;

import com.recommendation.domain.Recommendation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecommendationRepository extends MongoRepository<Recommendation,String> {
}
