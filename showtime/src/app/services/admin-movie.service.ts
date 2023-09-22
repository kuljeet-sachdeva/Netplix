import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8082/api/v2';//url

  public isUserLoggedIn = false;
  public isshowHide = false;

  constructor(private http: HttpClient) { }

  getUserDetails(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    };

    const res = this.http.get<any>(this.apiUrl+"/user",httpOptions);
    return res;
  }
  getAllUsers(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    };

    const res = this.http.get<any>(this.apiUrl+"/admin/users",httpOptions);
    return res;
  }
  getAdminMovies(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    };

    const res = this.http.get<any[]>(this.apiUrl+"/admin/movies",httpOptions);
    return res;
  }

  getAllMovies(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    };

    const res = this.http.get<any[]>(this.apiUrl+"/movies",httpOptions);
    return res;
  }


  addMovie(movie:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    };

    const res = this.http.post<any>(this.apiUrl+"/admin/movie", movie ,httpOptions);
    return res;
  }

  updateMovie(movie:any){
    let httpHeaders = new HttpHeaders({
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    });
    let httpOptions = {headers : httpHeaders}
    
    const res = this.http.put<any>(this.apiUrl+"/admin/movie", movie ,httpOptions);
    return res;
  }

  deleteMovie(movie:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    };

    const res = this.http.post<boolean>(this.apiUrl +"/admin/movie/delete",movie, httpOptions);
    return res;
  }

  getMovie(movieId:number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    };
    return this.http.get<any>(this.apiUrl +"/movie/"+movieId, httpOptions);
  }

}
