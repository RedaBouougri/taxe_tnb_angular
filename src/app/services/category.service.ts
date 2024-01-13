import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8050/api/category'; 

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/all");
  }

  deleteCategory(categoryId?: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/delete/${categoryId}`;
    return this.http.delete(deleteUrl);
  }

  addCategory(newCategory: Category): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/save', newCategory);
  }

  updateCategory(updatedCategory: Category): Observable<any> {
    const updateUrl = `${this.apiUrl}/update/${updatedCategory.id}`;
    return this.http.put(updateUrl, updatedCategory);
  }

  
}
