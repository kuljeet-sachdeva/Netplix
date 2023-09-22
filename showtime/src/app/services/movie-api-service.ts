import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {

  constructor(private http: HttpClient) { }

  baseurl = "https://api.themoviedb.org/3";
  apikey = "08cc33bd5ae3a747598ce2ad84376e66";


  //bannerapidata

  bannerApiData(): Observable<any> {
    return this.http.get(`${this.baseurl}/trending/all/week?api_key=${this.apikey}`);
  }


  // trendingmovieapidata 
  trendingMovieApiData(): Observable<any> {
    return this.http.get(`${this.baseurl}/trending/movie/day?api_key=${this.apikey}`);
  }
  // adventures movies
  fetchAdventureMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=12`);
  }
  // action 
  fetchActionMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=28`);
  }

  fetchPopularMovies(): Observable<any>{
    return this.http.get(`${this.baseurl}/movie/popular?api_key=${this.apikey}&page=1`);
  }

  // fetchAnimationMovies(): Observable<any> {
  //   return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=20`);
  // }

  // fetchThrillerMovies(): Observable<any> {
  //   return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=25`);
  // }


  /**------------------------------------------*/
  getCategories(): Observable<any>{
    return this.http.get(`${this.baseurl}/genre/movie/list?api_key=${this.apikey}`);
  }

  // searchmovie
  getSearchMovie(data: any): Observable<any> {
    return this.http.get(`${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`);
  }
  // getmoviedatails
  getMovieDetails(data: any): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${data}?api_key=${this.apikey}`)
  }
  // getMovieVideo
  getMovieVideo(data: any): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`)
  }

  // getMovieCast
  getMovieCast(data: any): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`)
  }
  
  getRecommendationMovieByCategory(genre:any):Observable<any>{
    return this.http.get(`${this.baseurl}/discover/movie/?api_key=${this.apikey}&with_genres=${genre}&page=2`)
  }

}
