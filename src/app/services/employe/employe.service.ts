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

  async login(
    email: string,
    mdp: string
  ): Promise<Observable<ResponseData<String>>> {
    return await this.http.post<ResponseData<String>>(
      `${this.employes_apiurl}/login`,
      { email, mdp }
    );
  }

  getEmploye(token: string): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(`${this.employes_apiurl}/list`, {
      headers: this.getHeaders(token),
    });
  }

  getEmployeActif(token: string): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(`${this.employes_apiurl}/list/activated`, {
      headers: this.getHeaders(token),
    });
  }
}
