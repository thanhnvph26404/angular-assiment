import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL: string = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {
  }
  islogin:boolean = false
  
  signup(user: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/signup`, user);
  }
  signin(user: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/signin`, user);
  }
  isAuthenticated() {
    return JSON.parse(localStorage.getItem('user')!) || null;
  }
  getUser(): any {
    const localStorageData:any = localStorage.getItem('user');
    const data = JSON.parse(localStorageData);
    if (data && data.user) {
      // return JSON.stringify(data.user, null, 2);
      return data.user
    }
    return null; // hoặc giá trị mặc định khác tuỳ vào logic của bạn
  }

  login(){
    this.islogin = true
  }

  logout(){
    this.islogin = false
  }

  isAuth(){
    return this.islogin
  }
}
