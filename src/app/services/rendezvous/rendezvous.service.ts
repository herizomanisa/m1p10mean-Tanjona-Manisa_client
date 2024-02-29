import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/app/models/ResponseData';
import { LocalStorageService } from '../storage/local-storage.service';
import { Rendezvous } from '../../models/Rendezvous';

interface RendezvousForm {
  id_customer?: string;
  id_service: string;
  id_employe?: string;
  date_heure: Date;
}

@Injectable({
  providedIn: 'root',
})
export class RendezvousService {
  private rendezvous_apiurl = `${environment.apiUrl}/api/rendezvous`;

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

  createRendezvous(
    data: RendezvousForm,
    token: string
  ): Observable<ResponseData<any>> {
    return this.http.post<ResponseData<any>>(
      `${this.rendezvous_apiurl}/create`,
      data,
      {
        headers: this.getHeaders(token),
      }
    );
  }

  createRendezvousNoEmploye(
    data: RendezvousForm,
    token: string
  ): Observable<ResponseData<any>> {
    return this.http.post<ResponseData<any>>(
      `${this.rendezvous_apiurl}/create/rendezvous-no-employe`,
      data,
      {
        headers: this.getHeaders(token),
      }
    );
  }

  getRendezvous(token: string): Observable<ResponseData<any>> {
    return this.http.post<ResponseData<any>>(`${this.rendezvous_apiurl}/list`, {
      headers: this.getHeaders(token),
    });
  }

  getRendezvousById(id: string, token: string): Observable<ResponseData<any>> {
    return this.http.post<ResponseData<any>>(
      `${this.rendezvous_apiurl}/rendezvous/${id}`,
      {
        headers: this.getHeaders(token),
      }
    );
  }

  updateRendezvous(
    id: string,
    data: Rendezvous,
    token: string
  ): Observable<ResponseData<any>> {
    return this.http.put<ResponseData<any>>(
      `${this.rendezvous_apiurl}/rendezvous/${id}`,
      data,
      {
        headers: this.getHeaders(token),
      }
    );
  }

  deleteRendezvous(id: string, token: string): Observable<ResponseData<any>> {
    return this.http.delete<ResponseData<any>>(
      `${this.rendezvous_apiurl}/rendezvous/${id}`,
      {
        headers: this.getHeaders(token),
      }
    );
  }

  getRendezvousNoEmploye(token: string): Observable<ResponseData<any>> {
    return this.http.post<ResponseData<any>>(
      `${this.rendezvous_apiurl}/no-employe`,
      {
        headers: this.getHeaders(token),
      }
    );
  }

  getRendezvousNoEmployeUpToDate(token: string): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(
      `${this.rendezvous_apiurl}/no-employe/up-date`,
      {
        headers: this.getHeaders(token),
      }
    );
  }
}
