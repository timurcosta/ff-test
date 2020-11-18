import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IResolutionState } from './mock-data.service';

const API_RESOLUTION = 'resolution';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getResolution(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${API_RESOLUTION}/${id}`);
  }

  getResolutionState(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${API_RESOLUTION}/state/${id}`);
  }

  setResolutionState(payload: IResolutionState): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/${API_RESOLUTION}/state`,
      payload
    );
  }
}
