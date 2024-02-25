import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseData } from '../../models/ResponseData';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private customers_apiurl = `${environment.apiUrl}/api/customers`;

  constructor(private http: HttpClient) {}

  private getHeaders(token: string): HttpHeaders {
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
      `${this.customers_apiurl}/login`,
      { email, mdp }
    );
  }
}
