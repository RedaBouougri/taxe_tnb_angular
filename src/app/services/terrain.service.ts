import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Terrain } from '../models/terrain';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {

  private apiUrl = 'http://localhost:8060/api/terain'; 
  private apiUrl2 = 'http://localhost:8050/api/terain'; 


  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTerrains(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allterain`, { headers: this.getHeaders() });
  }

  getRedTerrains(cin:String): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}/findbycin/${cin}`, { headers: this.getHeaders() });
  }

  deleteTerrain(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteterain/${id}`, { headers: this.getHeaders() });
  }

  addTerrain(newTerrain: Terrain): Observable<Terrain> {
    return this.http.post<Terrain>(`${this.apiUrl}/addterain`, newTerrain, { headers: this.getHeaders() });
  }

  addTerrain2(newTerrain: Terrain,cin:String): Observable<Terrain> {
    return this.http.post<Terrain>(`${this.apiUrl2}/save2/${cin}`, newTerrain, { headers: this.getHeaders() });
  }

  updateTerrain(updatedTerrain: Terrain): Observable<Terrain> {
    return this.http.put<Terrain>(`${this.apiUrl}/updateterain/${updatedTerrain.id}`, updatedTerrain, { headers: this.getHeaders() });
  }
}
