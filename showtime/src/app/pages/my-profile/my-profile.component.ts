import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from 'src/app/services/admin-movie.service';
import { UserService } from 'src/app/services/user-favourite.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

      userDetails: any;
      allFavouriteMovies:any;
      constructor(
        private movieService: MovieService,
        private userService: UserService,
        private snackbar: MatSnackBar
        ){}
    
      ngOnInit() {
        // this.userDetails = this.showUserDetails();
        this.showUserDetails();
        this.getAllFavouriteMovies();
      }

      showUserDetails()
      {
        this.movieService.getUserDetails().subscribe(
          response => {
            this.userDetails=response;
          },
          error => {
            console.log(error);
            // handle error
          }
        );
      }

      getAllFavouriteMovies(){
        this.userService.getFavoriteMovies().subscribe(
          response => {
            this.allFavouriteMovies=response;
            console.log(response);
          },
          error => {
            console.log(error);
            // handle error
          }
        );
      }

      removeFromFavourites(movie: any) {
        this.userService.removeFromFavourites(movie).subscribe((result) => {
          if(result == true){
            this.snackbar.open('Movie Removed from you Favourite List.', 'Success', {
              duration: 4000
            });
            this.getAllFavouriteMovies();
          }
        },(error)=>{
          console.log(error);
          this.snackbar.open('Something is wrong.', 'Failed', {
            duration: 2000
          });
        }
        );
      }
     
}
