import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from 'src/app/services/admin-movie.service';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})
export class ViewAllUsersComponent {

  userDetails: any;
  allUsers =[];

  constructor(private movieService: MovieService,
    private snackBar: MatSnackBar,) {}

  ngOnInit() {
    // this.userDetails = this.showUserDetails();
    this.showAllUsers();
  }

  showAllUsers()
  {

  this.movieService.getAllUsers().subscribe(
    response => {
      console.log(response);
      this.allUsers=response;
      
     
    },
    error => {
      console.log(error);
     
    }
    
  );
}

}
