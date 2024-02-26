import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseData } from '../../models/ResponseData';
import { environment } from '../../../environments/environment';

interface CustomerForm {
  image: string | null;
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  addresse: string | null;
  mdp: string;
}
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

  register(data: CustomerForm): Observable<any> {
    return this.http.post<ResponseData<String>>(
      `${this.customers_apiurl}/create`,
      data
    );
  }
}
