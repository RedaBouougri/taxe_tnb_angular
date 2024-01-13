import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Terrain } from '../models/terrain';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8060/api/terain'; 

  getTerrains(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allterain`);
  }

  deleteTerrain(id?: number): Observable<void> {
    
    return this.http.delete<void>(`${this.apiUrl}/deleteterain/${id}`);
  }

  addTerrain(newTerrain: Terrain): Observable<Terrain> {

    return this.http.post<Terrain>(`${this.apiUrl}/addterain`, newTerrain);
  }

  




}
