import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1';//url

  public isshowHide = false;

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  }

  constructor(private http: HttpClient) { }
  loginCheck(logindata:any){
    return this.http.post(this.apiUrl+"/login",logindata);
  }

  registerUser(signupdata:any){
    // authAppBeBaseUrl/regiser-uer1  with signupdata object  [POST]
    return this.http.post(this.apiUrl+"/signup",signupdata);
  }

  sendEmail(data:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    };
    return this.http.post(this.apiUrl+"/contact-us",data,httpOptions);
  }

  
  async getCities(): Promise<string[]> {
    const response = await this.http.get('assets/cities/worldcities.csv', { responseType: 'text' }).toPromise();
    // console.log(response);
    return this.parseCSV(response);
  }

  private parseCSV(data: string): string[] {
    const cities: string[] = [];

    const rows = data.split('\n');
    // const headerRow = rows[0].split(',');
    const cityIndex = 0;
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(',');
      if (row[cityIndex]) {
        const cityName = row[cityIndex].replace(/"/g, '');
        cities.push(cityName.toLowerCase());
      }
    }

    return cities;
  }

}