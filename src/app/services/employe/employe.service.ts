import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../storage/local-storage.service';
import { ResponseData } from 'src/app/models/ResponseData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeService {
  private employes_apiurl = `${environment.apiUrl}/api/employes`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private getHeaders(token: string | null): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getEmploye(token: string): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(`${this.employes_apiurl}/list`, {
      headers: this.getHeaders(token),
    });
  }
}
