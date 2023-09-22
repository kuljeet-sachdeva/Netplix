import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/services/movie-api-service';
import { Title, Meta } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user-favourite.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {


  constructor(
    private service: MovieApiServiceService,
    private router: ActivatedRoute,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private title: Title,
    private meta: Meta
  ) { }

  showHide = false;
  addedToFavourites=false;
  showMovieDetails=false;
  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult: any;
  allFavouriteMovies:any;
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (localStorage.getItem('token') != "") {
      this.showHide = true;
    } else {
      this.showHide = false;
    }
    let getParamId = this.router.snapshot.paramMap.get('id');
    // console.log(getParamId,'getparamid#');
    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);


    this.getAllFavouriteMovies();
    
  }

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe(async (result) => {
      // console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = await result;
      this.showMovieDetails =true;
      console.log(result);
      // updatetags
      this.title.setTitle(`${this.getMovieDetailResult.original_title} | ${this.getMovieDetailResult.tagline}`);
      this.meta.updateTag({ name: 'title', content: this.getMovieDetailResult.original_title });
      this.meta.updateTag({ name: 'description', content: this.getMovieDetailResult.overview });

      // facebook
      this.meta.updateTag({ property: 'og:type', content: "website" });
      this.meta.updateTag({ property: 'og:url', content: `` });
      this.meta.updateTag({ property: 'og:title', content: this.getMovieDetailResult.original_title });
      this.meta.updateTag({ property: 'og:description', content: this.getMovieDetailResult.overview });
      this.meta.updateTag({ property: 'og:image', content: `https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdrop_path}` });

    });
  }

  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      // console.log(result, 'getMovieVideo#');
      result.results.forEach((element: any) => {
        if (element.type == "Trailer") {
          this.getMovieVideoResult = element.key;
          console.log(element);
        }
      });

    });
  }

  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      // console.log(result, 'movieCast#');
      this.getMovieCastResult = result.cast;
    });
  }

  addToFavourites(movie: any) {
    const mv ={ 
      movieName : movie.title,
      movieId : movie.id,
      category : movie.genres[movie.genres.length-1].name,
      description: movie.overview,
      ratings:6.5
    }
    // console.log(mv);
    this.userService.addToFavourites(mv).subscribe((result) => {
      console.log(result);
      if(result == true){
        this.snackbar.open('Movie Added to you Favourite List.', 'Wow!', {
          duration: 4000
        });
        this.addedToFavourites = true;
      }
    },(error)=>{
      console.log(error);
      this.snackbar.open('Something is wrong.', 'Failed', {
        duration: 2000
      });
    }
    );
  }

  removeFromFavourites(movie: any) {
    console.log(movie);
    const mv ={ 
      movieName : movie.title,
      movieId : movie.id,
      category : movie.genres[movie.genres.length-1].name,
      description: movie.overview,
      ratings:6.5
    }
    this.userService.removeFromFavourites(mv).subscribe((result) => {
      if(result == true){
        this.snackbar.open('Movie Removed from you Favourite List.', 'Success', {
          duration: 4000
        });
      }
    },(error)=>{
      console.log(error);
      this.snackbar.open('Something is wrong.', 'Failed', {
        duration: 2000
      });
    }
    );
  }


  getAllFavouriteMovies() {
    this.userService.getFavoriteMovies().subscribe(
      (response) => {
        this.allFavouriteMovies = response;
        console.log(this.getMovieDetailResult);
        // console.log(this.allFavouriteMovies);
        const movieExists = this.allFavouriteMovies.some(mv => mv.movieId == this.getMovieDetailResult.id);
        
        if (movieExists) {
          this.addedToFavourites = true;
          // console.log(this.allFavouriteMovies);
        }
        // console.log(movieExists);
      },
      (error) => {
        console.log(error);
        // Handle error
      }
    );
  }


}