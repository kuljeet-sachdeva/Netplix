import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from 'src/app/services/admin-movie.service';

@Component({
  selector: 'app-view-added-movies',
  templateUrl: './view-added-movies.component.html',
  styleUrls: ['./view-added-movies.component.css']
})
export class ViewAddedMoviesComponent {
  userDetails: any;
  allAddedMovies = [];

  constructor(private movieService: MovieService,
    private snackBar: MatSnackBar,) { }

  ngOnInit() {
    // this.userDetails = this.showUserDetails();
    this.fetchAllAddedMovies();
  }
  deleteMovie(movie: any) {
    this.movieService.deleteMovie(movie).subscribe((response) => {
      if (response == true) {
        this.snackBar.open('You have removed ' + movie.movieName + ' successfully', 'Done', {
          duration: 3000
        });
        if(this.allAddedMovies.length <= 1){
          this.allAddedMovies = [];
        }
        this.fetchAllAddedMovies();
      }
    });
  }
  fetchAllAddedMovies() {
    this.movieService.getAdminMovies().subscribe(
      response => {
        console.log(response);
        if(response.length > 0){
          this.allAddedMovies = response;
        }
      },
      error => {
        console.log(error);
      }
    );
  }



}
