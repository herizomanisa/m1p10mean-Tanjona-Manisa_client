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

  getServiceById(id: number): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(
      `${this.services_apiurl}/service/${id}`
    );
  }

  updateService(
    id: number,
    data: Service,
    token: string
  ): Observable<ResponseData<any>> {
    return this.http.put<ResponseData<any>>(
      `${this.services_apiurl}/service/${id}`,
      data,
      { headers: this.getHeaders(token) }
    );
  }

  deleteService(id: number): Observable<ResponseData<any>> {
    return this.http.delete<ResponseData<any>>(
      `${this.services_apiurl}/service/${id}`
    );
  }

  createService(
    data: ServiceForm,
    token: string
  ): Observable<ResponseData<any>> {
    return this.http.post<ResponseData<any>>(
      `${this.services_apiurl}/create`,
      data,
      { headers: this.getHeaders(token) }
    );
  }
}
