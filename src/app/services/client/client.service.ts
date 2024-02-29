import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseData } from '../../models/ResponseData';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../storage/local-storage.service';
import { Offre } from '../../models/Offre';

interface CustomerForm {
  image: string | null;
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  addresse: string | null;
  mdp: string;
  sexe: string;
}
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private customers_apiurl = `${environment.apiUrl}/api/customers`;

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

  login(email: string, mdp: string): Observable<ResponseData<String>> {
    return this.http.post<ResponseData<String>>(
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

  getHistoryRendezvous(): Observable<any> {
    return this.http.get<ResponseData<String>>(
      `${this.customers_apiurl}/history/rendezvous`,
      {
        headers: this.getHeaders(
          this.localStorageService.getData('x-authorization-c-token')
        ),
      }
    );
  }

  searchByName(name: string, email: string): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(
      `${this.customers_apiurl}/search/name?name=${name}&email=${email}`,
      {
        headers: this.getHeaders(
          this.localStorageService.getData('x-authorization-m-token')
        ),
      }
    );
  }

  getOffres(headers: HttpHeaders): Observable<ResponseData<Offre[]>> {
    return this.http.get<ResponseData<Offre[]>>(`${this.customers_apiurl}/offers`, { headers: headers });
  }
  
  payment(data: { id_rendezvous: string }): Observable<any> {
    return this.http.post<ResponseData<String>>(
      `${this.customers_apiurl}/payment`,
      data
    );
  }

  getNotPaid(): Observable<any> {
    return this.http.get<ResponseData<String>>(
      `${this.customers_apiurl}/not-paid/rendezvous`,
      {
        headers: this.getHeaders(
          this.localStorageService.getData('x-authorization-c-token')
        ),
      }
    );
  }
}
