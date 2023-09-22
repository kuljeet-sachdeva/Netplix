import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RecommedationService {

  private apiUrl = 'http://localhost:8081/api/v4';//url

  constructor(private http: HttpClient) { }

  getRecommendationMovies(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    };
    return this.http.get(this.apiUrl+"/recommendations",httpOptions);
  }
}
