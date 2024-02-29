import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseData } from '../../models/ResponseData';
import { environment } from '../../../environments/environment';
import { Offre } from '../../models/Offre'

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private services_apiurl = `${environment.apiUrl}/api/offers`;
  // private headers_admin = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('x-authorization-m-token'));

  constructor(private http: HttpClient) {}

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getOffers(headers_admin: HttpHeaders): Observable<ResponseData<Offre[]>> {
    return this.http.get<ResponseData<Offre[]>>(`${this.services_apiurl}`, { headers: headers_admin });
  }

  getOffreUptodate(headers_admin: HttpHeaders): Observable<ResponseData<Offre[]>> {
    return this.http.get<ResponseData<Offre[]>>(`${this.services_apiurl}/up-to-date`, { headers: headers_admin });
  }

  getOffreById(headers_admin: HttpHeaders, id: string): Observable<ResponseData<Offre>> {
    return this.http.get<ResponseData<Offre>>(
      `${this.services_apiurl}/${id}`,
      { headers: headers_admin }
    );
  }

  updateOffre(
    headers_admin: HttpHeaders,
    id: string,
    data: Offre
  ): Observable<ResponseData<any>> {
    return this.http.put<ResponseData<any>>(
      `${this.services_apiurl}/${id}`,
      data,
      { headers: headers_admin }
    );
  }

  deleteOffre(headers_admin: HttpHeaders, id: string): Observable<ResponseData<any>> {
    return this.http.delete<ResponseData<any>>(
      `${this.services_apiurl}/${id}`,
      { headers: headers_admin}
    );
  }

  createOffre(headers_admin: HttpHeaders,
    data: Offre
  ): Observable<ResponseData<any>> {
    return this.http.post<ResponseData<any>>(
      `${this.services_apiurl}/`,
      data,
      { headers: headers_admin}
    );
  }
}
