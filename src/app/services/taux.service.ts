import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taux } from '../models/taux';

@Injectable({
  providedIn: 'root'
})
export class TauxService {

  private apiUrl = 'http://localhost:8050/api/taux'; // Adjust the API URL based on your server

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTauxList(): Observable<Taux[]> {
    return this.http.get<Taux[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }

  deleteTaux(id?: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() });
  }

  addTaux(newTaux: Taux): Observable<Taux> {
    return this.http.post<Taux>(`${this.apiUrl}/save`, newTaux, { headers: this.getHeaders() });
  }

  updateTaux(updatedTaux: Taux): Observable<Taux> {
    return this.http.put<Taux>(`${this.apiUrl}/update/${updatedTaux.id}`, updatedTaux, { headers: this.getHeaders() });
  }
}
