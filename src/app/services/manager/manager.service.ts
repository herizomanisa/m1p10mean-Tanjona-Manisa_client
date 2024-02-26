import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseData } from '../../models/ResponseData'
import { StatMois } from '../../models/StatMois'

@Injectable({
  providedIn: 'root'
})

export class ManagerService {

  private apiurl='http://localhost:5000/api/managers';
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('x-authorization-m-token'));

  constructor(private http: HttpClient) { }

  async login(nom: string, mdp: string): Promise<Observable<ResponseData<String>>>{
      return await this.http.post<ResponseData<String>>(`${this.apiurl}/login`, {nom, mdp})
  }

  getStatistics_rdv_mois(): Observable<ResponseData<StatMois[]>>{
    return this.http.get<ResponseData<StatMois[]>>(`${this.apiurl}/statistique/reservation-mois`,{ headers: this.headers })
  }

  getTravail(): Observable<ResponseData<String>>{
    return this.http.get<ResponseData<String>>(`${this.apiurl}/statistique/employe`,{ headers: this.headers })
}
}
