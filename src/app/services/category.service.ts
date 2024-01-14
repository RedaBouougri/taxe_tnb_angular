import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8050/api/category'; 

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/all', { headers: this.getHeaders() });
  }

  deleteCategory(categoryId?: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/delete/${categoryId}`;
    return this.http.delete(deleteUrl, { headers: this.getHeaders() });
  }

  addCategory(newCategory: Category): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/save', newCategory, { headers: this.getHeaders() });
  }

  updateCategory(updatedCategory: Category): Observable<any> {
    const updateUrl = `${this.apiUrl}/update/${updatedCategory.id}`;
    return this.http.put(updateUrl, updatedCategory, { headers: this.getHeaders() });
  }
}
