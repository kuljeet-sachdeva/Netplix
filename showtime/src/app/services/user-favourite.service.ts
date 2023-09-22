import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8083/api/v3/favourite';//url

  constructor(private http: HttpClient) { }

  addToFavourites(movie:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    };
    return this.http.post(this.apiUrl+"/movie/add",movie,httpOptions);
  }

  removeFromFavourites(movie:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    };
    return this.http.post(this.apiUrl+"/movie/remove",movie,httpOptions);
  }

  getFavoriteMovies() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    };
    return this.http.get(this.apiUrl+"/movies",httpOptions);
  }

}
