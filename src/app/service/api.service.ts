import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'https://swapi.py4e.com/api/';
  id: number | undefined = undefined;
  nextPageUrl: string | undefined = undefined;
  noMorePages: boolean = false;

  constructor(private http: HttpClient) {}

  getStarships(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/starships?format=json`).pipe(
      tap((data) => {
        this.nextPageUrl = data.next;
      })
    );
  }

  getStarshipId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/starships/${id}/?format=json`);
  }

  getNextStarships(): Observable<any> {
    if (!this.nextPageUrl) {
      this.noMorePages = true;
      console.warn('No more pages to load.');
      return new Observable((observer) => observer.complete());
    }
    return this.http.get<any>(`${this.nextPageUrl}`).pipe(
      tap({
        next: (data) => {
          this.nextPageUrl = data.next;
        },
        error: (err) => {
          console.error('Error fetching next starships:', err);
        },
      })
    );
  }
}
