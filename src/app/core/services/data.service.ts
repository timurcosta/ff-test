import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IResolution, IResolutionState } from './mock-data.service';

const API_RESOLUTION = 'resolution';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getResolution(id: number): Observable<IResolution> {
    return this.http.get<IResolution>(
      `${environment.apiUrl}/${API_RESOLUTION}/${id}`
    );
  }

  getResolutionState(id: number): Observable<IResolutionState> {
    return this.http.get<IResolutionState>(
      `${environment.apiUrl}/${API_RESOLUTION}/state/${id}`
    );
  }

  setResolutionState(payload: IResolutionState): Observable<IResolutionState> {
    return this.http.post<IResolutionState>(
      `${environment.apiUrl}/${API_RESOLUTION}/state`,
      payload
    );
  }
}
