import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseData } from '../../models/ResponseData';
import { environment } from '../../../environments/environment';

import { Service } from '../../models/Service';

interface ServiceForm {
  nom: string;
  prix: number;
  duree: number;
  commission: number;
  is_activated?: boolean
}

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private services_apiurl = `${environment.apiUrl}/api/services`;
  // private headers_admin = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('x-authorization-m-token'));

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

  getServiceActif(): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(`${this.services_apiurl}/list/activated`);
  }

  getServiceById(id: string): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(
      `${this.services_apiurl}/service/${id}`
    );
  }

  searchByName(name: string): Observable<ResponseData<Service[]>> {
    return this.http.get<ResponseData<Service[]>>(
      `${this.services_apiurl}/search/name?name=${name}`
    );
  }

  updateService(headers_admin: HttpHeaders,
    id: string,
    data: Service
  ): Observable<ResponseData<any>> {
    return this.http.put<ResponseData<any>>(
      `${this.services_apiurl}/service/${id}`,
      data,
      { headers: headers_admin }
    );
  }

  deleteService(headers_admin: HttpHeaders, id: string): Observable<ResponseData<any>> {
    return this.http.delete<ResponseData<any>>(
      `${this.services_apiurl}/service/${id}`,
      { headers: headers_admin}
    );
  }

  createService(headers_admin: HttpHeaders,
    data: ServiceForm
  ): Observable<ResponseData<any>> {
    return this.http.post<ResponseData<any>>(
      `${this.services_apiurl}/create`,
      data,
      { headers: headers_admin}
    );
  }

  updateServiceToActivated(headers_admin: HttpHeaders,
    id: string,
    is_activated: boolean
  ): Observable<ResponseData<any>> {
    return this.http.put<ResponseData<any>>(
      `${this.services_apiurl}/service/${id}`,
      {is_activated},
      { headers: headers_admin }
    );
  }
}
