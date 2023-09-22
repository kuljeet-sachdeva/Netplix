package com.niit.movieService;

import com.niit.movieService.domain.Movie;
import com.niit.movieService.repository.MovieRepository;
import com.niit.movieService.service.MovieService;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.Assert.*;

@SpringBootTest
class MovieServiceApplicationTests {
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private MovieService movieService;
    Movie movie;
    @Before
    public void setUp() {
        movie = new Movie();
        movie.setMovieName("Test");
        movie.setMovieId(12);
    }

    @Test
    public void testAddMovie() {
        Movie result = movieService.addMovie(movie);
        assertSame(movie,result);

        // Retrieve the movie from the repository to verify it was added correctl
        Movie retrievedMovie = movieRepository.findById(movie.getMovieId()).get();
        assertNotNull(retrievedMovie);
        assertEquals(movie, retrievedMovie);
    }

    @Test
    public void testUpdateMovie() {

        Movie addResult = movieService.addMovie(movie);
        assertSame(movie,addResult);
        movie.setMovieName("UpdatedTitle");
        movie.setDescription("UpdatedDirector");
        Movie updateResult = movieService.updateMovie(movie);
        assertSame(movie,updateResult);
        Movie updatedMovie = movieRepository.findById(movie.getMovieId()).get();
        assertNotNull(updatedMovie);
        assertEquals(movie, updatedMovie);
    }

    public void testGetAllMovies() {
        movie.setMovieName("Test");
        movie.setMovieId(12);
        Movie movie1 = movieRepository.save(movie);
        movie.setMovieName("Test 2");
        movie.setMovieId(12);
        Movie movie2 = movieRepository.save(movie);
        List<Movie> movies = movieService.getAllMovies();

        assertNotNull(movies);
        assertFalse(movies.isEmpty());
        assertEquals(2, movies.size());

        assertTrue(movies.contains(movie1));
        assertTrue(movies.contains(movie2));
    }
}






