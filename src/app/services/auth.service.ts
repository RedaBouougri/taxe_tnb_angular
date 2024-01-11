import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8060/api'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) { }

  signUp(username: string, email: string, password: string, lastName: String, firstName: String, cin: String): Observable<any> {
    const signUpData = { username, email, password, lastName, firstName, cin };
    return this.http.post(`${this.apiUrl}/auth/signup`, signUpData);
  }

  signIn(username: string, password: string): Observable<any> {
    const signInData = { username, password };
    return this.http.post(`${this.apiUrl}/auth/signin`, signInData);
  }
}
