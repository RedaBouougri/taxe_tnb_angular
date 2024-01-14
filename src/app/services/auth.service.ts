import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8060/api'; 

  constructor(private http: HttpClient,private router: Router) { }

  signUp(username: string, email: string, password: string, lastName: string, firstName: string, cin: string): Observable<any> {
    const signUpData = { username, email, password, lastName, firstName, cin };
    return this.http.post(`${this.apiUrl}/auth/signup`, signUpData);
  }

  signIn(username: string, password: string): Observable<any> {
    const signInData = { username, password };
    return this.http.post(`${this.apiUrl}/auth/signin`, signInData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('username', response.username);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  signOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.router.navigate(['/']); 

  }
}
