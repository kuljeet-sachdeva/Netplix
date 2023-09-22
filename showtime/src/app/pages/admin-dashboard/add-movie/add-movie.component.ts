import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from 'src/app/services/admin-movie.service';
import { MovieApiServiceService } from 'src/app/services/movie-api-service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  addMovieForm: FormGroup;
  categories = [];
  movieId:any;
  movie:any;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private movieApiService: MovieApiServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.addMovieForm = this.formBuilder.group({
      description: ['', Validators.required],
      moviePic: [''],
      movieName: ['', Validators.required],
      category: ['', Validators.required],
      ratings: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1})?$/)]]
    });

    this.getAllCategories();
  }

  getmovieId(){
    this.movie = {"movieName":this.addMovieForm.get("movieName").value};
    // console.log(this.movie);
    this.movieApiService.getSearchMovie(this.movie).subscribe({
      next:(response)=>{
        if(response.results.length>0){
          // console.log(response.results);
          const movie = response.results.filter(m=> m.title.toLowerCase() == this.movie.movieName.toLowerCase());
          console.log(movie);
          if(movie){
            this.movieId = movie[0].id;
            console.log(this.movieId);
          }
        }
      },
      error: (error)=>{
        console.log(error);
      }
    });
  }

  addMovie() {
    if (this.addMovieForm.valid) {
      const form = this.addMovieForm.value;
      console.log(this.movieId);
      if(this.movieId != null){
        form.movieId = this.movieId;
      }else{
        form.movieId = Math.floor(Math.random() * 1001);
      }
      form.profilePic = null;
      this.movieService.addMovie(form).subscribe(
        response => {
          this.snackBar.open('You have added successfully', 'Success', {
            duration: 3000
          });
          this.addMovieForm.reset();
        },
        error => {
          this.snackBar.open(error.error.message, error.error.error, {
            duration: 3000
          });
        }
      );
    }
  }

  getAllCategories() {
    this.movieApiService.getCategories().subscribe((response) => {
      this.categories = response.genres;
    });
  }
}
