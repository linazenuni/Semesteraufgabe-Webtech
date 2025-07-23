import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buch } from './buch'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuchService {

  private apiUrl = 'http://localhost:3000/buecher'; 

  constructor(private http: HttpClient) { }

  
  getBuecher(): Observable<Buch[]> {
    return this.http.get<Buch[]>(this.apiUrl);
  }

  
  addBuch(buch: Buch): Observable<Buch> {
    return this.http.post<Buch>(this.apiUrl, buch);
  }

  
  deleteBuch(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

