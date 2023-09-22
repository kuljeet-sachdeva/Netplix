import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MovieApiServiceService } from 'src/app/services/movie-api-service';
import { MovieService } from 'src/app/services/admin-movie.service';

@Component({
  selector: 'app-view-all-movies',
  templateUrl: './view-all-movies.component.html',
  styleUrls: ['./view-all-movies.component.css']
})
export class ViewAllMoviesComponent {

  constructor(private service: MovieApiServiceService,private title:Title,private meta:Meta,private movieService:MovieService,) {
    
    this.title.setTitle('Home - showtime');
    this.meta.updateTag({name:'description',content:'watch online movies'});
    
   }
   movieSections=[];

   ngOnInit(): void {
    this.getMovieSections();
   }

   getMovieSections() {
    this.service.trendingMovieApiData().subscribe((response) => {
      // console.log(response, 'trendingresult#');
      this.movieSections.push(response.results);
    });
  
    this.service.fetchActionMovies().subscribe((response) => {
      this.movieSections.push(response.results);
    });

    this.service.fetchAdventureMovies().subscribe((response) => {
      this.movieSections.push(response.results);
    });

    this.service.fetchPopularMovies().subscribe((response) => {
      this.movieSections.push(response.results);
      // console.log(this.upcomingMovies);
    });
    const uniqueCategories = [...new Set(this.movieSections)];
    this.movieSections = uniqueCategories;
  }

  loadMore(){

  }

  
}
