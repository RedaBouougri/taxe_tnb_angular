import { Injectable } from '@angular/core';
import { Taxe } from '../models/taxe';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaxeService {

  private apiUrl = 'http://localhost:8060/api/taxe'; 

  private apiUrl2 = 'http://localhost:8050/api/kafka'; 

  private apiUrl3= 'http://localhost:8050/api/taxe'; 


  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTaxesList(cin:String): Observable<Taxe[]> {
    return this.http.get<Taxe[]>(`${this.apiUrl3}/findbyredevable/${cin}`, { headers: this.getHeaders() });
  }


  payerTaxe(newTaxe: Taxe): Observable<Taxe> {
    return this.http.post<Taxe>(`${this.apiUrl}/sendToKafka`, newTaxe, { headers: this.getHeaders() });
  }

  accepterTaxe(newTaxe: Taxe): Observable<Taxe> {
    return this.http.post<Taxe>(`${this.apiUrl3}/save`, newTaxe, { headers: this.getHeaders() });
  }

  adminTaxes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2 + '/taxes', { headers: this.getHeaders() });
  }

  deleteTaxe(taxe?: Taxe): Observable<any> {
    return this.http.delete(`${this.apiUrl2}/delete`, { headers: this.getHeaders() });
  }
}
