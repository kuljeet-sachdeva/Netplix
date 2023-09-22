import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/admin-movie.service';
import { MovieApiServiceService } from 'src/app/services/movie-api-service';
import { AuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent {
  updateMovieForm: FormGroup;
  currentMovie: any;
  categories = [];

  constructor(
    private snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private movieApiService:MovieApiServiceService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {
    this.updateMovieForm = this.formBuilder.group({
      movieId:[''],
      movieName: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      ratings: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1})?$/)]],
      moviePic: [''],
    });

  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    let getParamId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getMovie(getParamId);
    this.getAllCategories();
  }

  getMovie(id: any) {
    this.movieService.getMovie(id).subscribe((response) => {
      this.currentMovie = response;
      this.updateMovieForm.patchValue({
        movieId:response.movieId,
        movieName: response.movieName,
        description: response.description,
        category:response.category,
        ratings: response.ratings
      });

      // console.log(response);
      // console.log(this.updateMovieForm);
    });
  }

  updateMovie() {
    if (this.updateMovieForm.valid) {
      console.log(this.updateMovieForm.value);
      this.movieService.updateMovie(this.updateMovieForm.value).subscribe(
        response => {
          console.log(response);
          this.snackBar.open('You have updated successfully', 'Success', {
            duration: 3000
          });
        },
        error => {
          console.log(error);
          this.snackBar.open('Something wrong try again.', 'Failed', {
            duration: 3000
          });
          // handle error
        }
      );
      this.router.navigateByUrl('/admin/movies');
    }
  }

  getAllCategories() {
    this.movieApiService.getCategories().subscribe((response) => {
      this.categories = response.genres;
    });
  }

  getFileExtension(file: File): string {
    if (file && file.type) {
      const parts = file.type.split('/');
      if (parts.length === 2) {
        return parts[1];
      }
    }
    return '';
  }

}
