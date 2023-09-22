package com.recommendation.service;

import com.recommendation.config.MovieDTO;
import com.recommendation.domain.Recommendation;
import com.recommendation.repository.RecommendationRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecommendationServiceImpl implements RecommendationService{
    private RecommendationRepository recommendationRepository;

    @Autowired
    public RecommendationServiceImpl(RecommendationRepository recommendationRepository) {
        this.recommendationRepository = recommendationRepository;
    }

    @RabbitListener(queues = "movie.queue")
    public void saveRecommendation(MovieDTO movieDTO) {
        System.out.println("<><><><><><><><><><><><><><><><><><><><><><><><><><>");
        System.out.println("movieDTO");
        System.out.println(movieDTO);
        Recommendation recommendation = new Recommendation();
        String email = movieDTO.getJsonObject().get("email").toString();
        recommendation.setEmail(email);
        String movieCategory = movieDTO.getJsonObject().get("movieCategory").toString();
        if(recommendationRepository.findById(email).isEmpty()){
            List<String> existList = new ArrayList<>();
            existList.add(movieCategory);
            recommendation.setRecommendationCategoryList(existList);
        }else {
            List<String> existList = recommendationRepository.findById(email).get().getRecommendationCategoryList();
            existList.add(movieCategory);
            recommendation.setRecommendationCategoryList(existList);
        }
        System.out.println("<><><><><><><><><><><><><><><><><><><><><><><><><><>");
        System.out.println("Recommendation");
        System.out.println(recommendation);
        recommendationRepository.save(recommendation);
    }


//    @Override
//    public Recommendation saveRecommendation(String email,String category) {
//        Recommendation recommendation = new Recommendation();
//        recommendation.setEmail(email);
//        if(recommendationRepository.findById(email).isEmpty()){
//            List<String> existList = new ArrayList<>();
//            existList.add(category);
//            recommendation.setRecommendationCategoryList(existList);
//        }else {
//            List<String> existList = recommendationRepository.findById(email).get().getRecommendationCategoryList();
//            existList.add(category);
//            recommendation.setRecommendationCategoryList(existList);
//        }
//        System.out.println("<><><><><><><><><><><><><><><><><><><><><><><><><><>");
//        System.out.println("Recommendation");
//        System.out.println(recommendation);
//        return recommendationRepository.save(recommendation);
//    }

    @Override
    public Recommendation getRecommendation(String email) {
        System.out.println("--------------------recom-----------------------");
        System.out.println(email);
        if(recommendationRepository.findById(email).isPresent()) {
            Recommendation recommendation = recommendationRepository.findById(email).get();
            return recommendation;
        }
        System.out.println(recommendationRepository.findById(email).get());
        return null;
    }

    @Override
    public Recommendation clearRecommendationList(String email) {
        List<String> clear = new ArrayList<>();
        if(recommendationRepository.findById(email).isPresent()){
            Recommendation recommendation = recommendationRepository.findById(email).get();
            recommendation.setRecommendationCategoryList(clear);
            return recommendationRepository.save(recommendation);
        }
        return null;
    }
}
