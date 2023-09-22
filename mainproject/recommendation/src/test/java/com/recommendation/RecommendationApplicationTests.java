package com.recommendation;

import com.recommendation.domain.Recommendation;
import com.recommendation.repository.RecommendationRepository;
import com.recommendation.service.RecommendationServiceImpl;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;


@SpringBootTest
class RecommendationApplicationTests {

	private RecommendationServiceImpl recommendationService;
	@Autowired
	private RecommendationRepository recommendationRepository;
	String email;
	@Before
	public void setUp() {
		System.out.println("=================");
		// Initialize the MovieRecommendationService with the mock MovieDatabase
		recommendationService = new RecommendationServiceImpl(recommendationRepository);
		email = "testuser@gmail.com";
		List<String> listCategory = new ArrayList<>();
		listCategory.add("Comedy");
		Recommendation recommendation = new Recommendation(email,listCategory);
		recommendationRepository.save(recommendation);
	}

	@Test
	public void testGetRecommendationMovies() {
		Recommendation recommendations = recommendationService.getRecommendation(email);
		System.out.println("------------------");
		assertNotNull(recommendations);
		assertFalse(recommendations.getEmail().isEmpty());

	}

}


