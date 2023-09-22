import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SearchComponent } from './pages/search/search.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AddMovieComponent } from './pages/admin-dashboard/add-movie/add-movie.component';
import { UpdateMovieComponent } from './pages/admin-dashboard/update-movie/update-movie.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ViewAllMoviesComponent } from './pages/view-all-movies/view-all-movies.component';
import { ViewAllUsersComponent } from './pages/admin-dashboard/view-all-users/view-all-users.component';
import { ViewAddedMoviesComponent } from './pages/admin-dashboard/view-added-movies/view-added-movies.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:'dashboard',component:HomeComponent},
  {path:'search',component:SearchComponent},
  {path:'movie/:id',component:MovieDetailsComponent},

  {path:"signup",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"movies",component:ViewAllMoviesComponent},
  {path:"contact-us",component:ContactUsComponent},

  {path:"my-profile",component:MyProfileComponent,canActivate:[authGuard]},

  {path:"admin",component:AdminDashboardComponent,canActivate:[adminGuard]},
  {path:"admin/add-movie",component:AddMovieComponent,canActivate:[adminGuard]},
  {path:"admin/update-movie/:id",component:UpdateMovieComponent,canActivate:[adminGuard]},
  {path:"admin/users",component:ViewAllUsersComponent,canActivate:[adminGuard]},
  {path:"admin/movies",component:ViewAddedMoviesComponent,canActivate:[adminGuard]},

 // {path:"**",component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
