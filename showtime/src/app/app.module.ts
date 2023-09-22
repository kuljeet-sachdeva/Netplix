import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import {HttpClientModule} from '@angular/common/http';
import { MovieApiServiceService } from './services/movie-api-service';
import {MatIconModule} from '@angular/material/icon';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './pages/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { UpdateMovieComponent } from './pages/admin-dashboard/update-movie/update-movie.component';
import { AddMovieComponent } from './pages/admin-dashboard/add-movie/add-movie.component';
import { ViewAllUsersComponent } from './pages/admin-dashboard/view-all-users/view-all-users.component';
import { ViewAllMoviesComponent } from './pages/view-all-movies/view-all-movies.component';
import { ViewAddedMoviesComponent } from './pages/admin-dashboard/view-added-movies/view-added-movies.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    MovieDetailsComponent,
    HomeComponent,
    SearchComponent,
    MovieDetailsComponent,
    LoginComponent,
    SignupComponent,
    AdminDashboardComponent,
    ContactUsComponent,
    HeaderComponent,
    MyProfileComponent,
    UpdateMovieComponent,
    AddMovieComponent,
    ViewAllUsersComponent,
    ViewAllMoviesComponent,
    ViewAddedMoviesComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule, // Add this line
    ReactiveFormsModule, BrowserAnimationsModule, // Add this line
  ],
  
  providers: [MovieApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
