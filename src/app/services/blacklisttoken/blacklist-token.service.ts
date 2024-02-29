import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../../models/ResponseData';

@Injectable({
  providedIn: 'root'
})
export class BlacklistTokenService {
  private services_apiurl = `${environment.apiUrl}/api/blacklist`;

  constructor(private http: HttpClient) { }

  deconnection(token: string): Observable<ResponseData<any>> {
    return this.http.post<ResponseData<any>>(`${this.services_apiurl}/deconnection`, { token: token });
  }
}
