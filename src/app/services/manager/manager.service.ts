import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../../models/ResponseData'

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private apiurl='http://localhost:5000/api/managers';

  constructor(private http: HttpClient) { }

  async login(nom: string, mdp: string): Promise<Observable<ResponseData<String>>>{
    // this.http.post(`${this.apiurl}`, {nom, mdp}).subscribe(
    //   (result) =>{
    //     console.log(result)
    //     return result;
    //   },
    //   (error) => {
    //     return null; // Handle errors
    //   },
    // )
    // return this.http.post(`${this.apiurl}`, {nom, mdp}).toPromise();
      return await this.http.post<ResponseData<String>>(`${this.apiurl}/login`, {nom, mdp})
      
      // log.subscribe(
      //   (response: ResponseData<String>) => {
      //     console.log(response.details)
      //     return response.details
      //   }
      // );

      // return 'nope';
      // console.log(log.details)
      // if(!log) return log;
      // return null;
    
  }
}
