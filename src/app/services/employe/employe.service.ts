import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../storage/local-storage.service';
import { ResponseData } from '../../models/ResponseData';
import { Observable } from 'rxjs';
import { Employe } from '../../models/Employe';

interface EmployeForm {
  image: string;
  nom: string;
  prenom: string;
  sexe: string;
  tel: string;
  email: string;
  addresse: string;
  mdp: string;
  heure_debut?: string;
  heure_fin?: string;
}
@Injectable({
  providedIn: 'root',
})
export class EmployeService {
  private employes_apiurl = `${environment.apiUrl}/api/employes`;
  // private headers_admin = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('x-authorization-m-token'));

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

  getEmploye(headers_admin: HttpHeaders): Observable<ResponseData<Employe[]>> {
    return this.http.get<ResponseData<Employe[]>>(`${this.employes_apiurl}/list`, {
      headers: headers_admin,
    });
  }

  getEmployeActif(token: string): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(
      `${this.employes_apiurl}/list/activated`,
      {
        headers: this.getHeaders(token),
      }
    );
  }

  getEmployeByIdEmploye(
    id: string,
    token: string
  ): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(
      `${this.employes_apiurl}/employe/${id}`,
      {
        headers: this.getHeaders(token),
      }
    );
  }

  updateEmployeByIdemploye(
    id: string,
    data: EmployeForm,
    token: string
  ): Observable<ResponseData<any>> {
    return this.http.put<ResponseData<any>>(
      `${this.employes_apiurl}/employe/${id}`,
      data,
      {
        headers: this.getHeaders(token),
      }
    );
  }

  getEmployeById(headers_admin: HttpHeaders, id: string): Observable<ResponseData<Employe>> {
    return this.http.get<ResponseData<Employe>>(
      `${this.employes_apiurl}/employe/${id}`,
      { headers: headers_admin}
    );
  }

  updateEmploye(headers_admin: HttpHeaders, id: string, data: Employe): Observable<ResponseData<any>> {
    return this.http.put<ResponseData<any>>(
      `${this.employes_apiurl}/employe/${id}`,
      data,
      { headers: headers_admin }
    );
  }

  deleteEmploye(headers_admin: HttpHeaders, id: string): Observable<ResponseData<any>> {
    return this.http.delete<ResponseData<any>>(
      `${this.employes_apiurl}/employe/${id}`,
      { headers: headers_admin}
    );
  }

  createEmploye(headers_admin: HttpHeaders, data: Employe): Observable<ResponseData<any>> {
    return this.http.post<ResponseData<any>>(
      `${this.employes_apiurl}/create`,
      data,
      { headers: headers_admin}
    );
  }

  updateEmployeToActivated(headers_admin: HttpHeaders, id: string, is_activated: boolean): Observable<ResponseData<any>> {
    return this.http.put<ResponseData<any>>(
      `${this.employes_apiurl}/employe/${id}`,
      {is_activated},
      { headers: headers_admin }
    );
  }
}
