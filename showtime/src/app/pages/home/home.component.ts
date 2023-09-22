import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/services/movie-api-service';
import { Title,Meta } from '@angular/platform-browser';
import { MovieService } from 'src/app/services/admin-movie.service';
import { RecommedationService } from 'src/app/services/recommedation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private service: MovieApiServiceService,
    private movieService:MovieService,
    private recommendationService:RecommedationService,
    private title:Title,private meta:Meta) {
      this.title.setTitle('Home - showtime');
      this.meta.updateTag({name:'description',content:'watch online movies'});
    }

  bannerResult = [];
  movieSections =[];
  newAddedMoviesResult=[];
  recommendedMovieResult=[];

  activeItemIndex:any;
  newAddedMovieShow=false;
  userLoggedIn=false;
  popularMovies:any;

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll, true);
    this.bannerData();
    this.findRecommendedMovies();
    this.newAddedMovies();
    this.checkLogin();
    this.getMovieSections();
  }

  
  checkLogin(){
    if(localStorage.getItem('token') != ""){
      this.userLoggedIn = true;
    }else{
      this.userLoggedIn = false;
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll, true);
  }
  
  onScroll = (event: any) => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // Calculate the active item index based on the scroll position
    const carouselHeight = document.querySelector('.carousel-inner')?.clientHeight || 0;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    const currentIndex = Math.floor(scrollPos / (carouselHeight - windowHeight) * this.bannerResult.length);
    
    // Update the activeItemIndex only if it has changed
    if (currentIndex !== this.activeItemIndex) {
      this.activeItemIndex = currentIndex;
    }
  };

  // bannerdata
  bannerData() {
    this.service.bannerApiData().subscribe((response) => {
      // console.log(response, 'bannerresult#');
      this.bannerResult = response.results;
      const len =response.results.length;
      this.activeItemIndex = Math.floor(Math.random() * len); 
    });
  }

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe((response) => {
      // console.log(response, 'getmoviedetails#');
      this.newAddedMoviesResult.push(response);
      if(this.newAddedMoviesResult.length > 0){
        this.newAddedMovieShow =true;
      }
    });
  }

  newAddedMovies(){
    this.movieService.getAllMovies().subscribe((response) => {
      // console.log("newAddedMovies");
      // console.log(response);
      for(var i=0; i<response.length; i++){
        this.getMovie(response[i].movieId);
      }
    });
  }

  findRecommendedMovies() {
    this.recommendationService.getRecommendationMovies().subscribe((response) => {
      if (response != null) {
        const recommedationCategories = response.recommendationCategoryList;
        const uniqueCategories = [...new Set(recommedationCategories)];
        for (const category of uniqueCategories) {
          this.service.getRecommendationMovieByCategory(category).subscribe((response) => {
            // console.log(`Recommended movie for ${category}:`, response.results);
            if(Array.isArray(response.results)){
              this.recommendedMovieResult.push(...response.results);
            }
          });
        }
      }
    });
  }


  getMovieSections() {
    this.service.trendingMovieApiData().subscribe((response) => {
      // console.log(response.results, 'trendingresult#');
      response.results.movieType = "Trending";
      this.movieSections.push(response.results);
    });
  
    this.service.fetchActionMovies().subscribe((response) => {
      response.results.movieType = "Action";
      this.movieSections.push(response.results);
    });

    this.service.fetchAdventureMovies().subscribe((response) => {
      response.results.movieType = "Adventure";
      this.movieSections.push(response.results);
    });

    this.service.fetchPopularMovies().subscribe((response) => {
      response.results.movieType = "Popular";
      this.movieSections.push(response.results);
      // console.log(this.upcomingMovies);
    });
  }

  // animationMovie() {
  //   this.service.fetchAnimationMovies().subscribe((response) => {
  //     this.animationMovieResult = response.results;
  //   });
  // }

  // comedyMovie(){
  //   this.service.fetchAdventureMovies().subscribe((response) => {
  //     this.comedyMovieResult = response.results;
  //   });
  // }
  // sciencefictionMovie(){
  //   this.service.fetchAdventureMovies().subscribe((response) => {
  //     this.sciencefictionMovieResult = response.results;
  //   });
  // }

  // thrillerMovie(){
  //   this.service.fetchThrillerMovies().subscribe((response) => {
  //     this.thrillerMovieResult = response.results;
  //   });
  // }
  

}
