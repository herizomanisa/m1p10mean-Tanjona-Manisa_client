import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/app/models/ResponseData';
import { environment } from 'src/environments/environment';

import { Service } from '../../models/Service';

interface ServiceForm {
  nom: string;
  prix: number;
  duree: number;
  commission: number;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private services_apiurl = `${environment.apiUrl}/api/services`;
  private headers_admin = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('x-authorization-m-token'));

  constructor(private http: HttpClient) {}

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getService(): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(`${this.services_apiurl}/list`);
  }

  getServiceById(id: string): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(
      `${this.services_apiurl}/service/${id}`
    );
  }

  updateService(
    id: string,
    data: Service
  ): Observable<ResponseData<any>> {
    return this.http.put<ResponseData<any>>(
      `${this.services_apiurl}/service/${id}`,
      data,
      { headers: this.headers_admin }
    );
  }

  deleteService(id: string): Observable<ResponseData<any>> {
    return this.http.delete<ResponseData<any>>(
      `${this.services_apiurl}/service/${id}`,
      { headers: this.headers_admin}
    );
  }

  createService(
    data: ServiceForm
  ): Observable<ResponseData<any>> {
    return this.http.post<ResponseData<any>>(
      `${this.services_apiurl}/create`,
      data,
      { headers: this.headers_admin}
    );
  }
}
