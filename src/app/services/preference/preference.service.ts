import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from 'src/app/models/ResponseData';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../storage/local-storage.service';

interface PreferenceForm {
  id_customer: string;
  id_prefere: string;
  designation: string;
}

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {
  private preferences_apiurl = `${environment.apiUrl}/api/preferences`;

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

  getAllServiceActivatedPlusPreference(): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(
      `${this.preferences_apiurl}/all-services/activated`,
      {
        headers: this.getHeaders(
          this.localStorageService.getData('x-authorization-c-token')
        ),
      }
    );
  }

  getAllEmployeActivatedPlusPreference(): Observable<ResponseData<any>> {
    return this.http.get<ResponseData<any>>(
      `${this.preferences_apiurl}/all-employes/activated`,
      {
        headers: this.getHeaders(
          this.localStorageService.getData('x-authorization-c-token')
        ),
      }
    );
  }

  createPreference(data: PreferenceForm): Observable<ResponseData<any>> {
    return this.http.post<ResponseData<any>>(
      `${this.preferences_apiurl}/`,
      data,
      {
        headers: this.getHeaders(
          this.localStorageService.getData('x-authorization-c-token')
        ),
      }
    );
  }

  deletePreference(id: string): Observable<ResponseData<any>> {
    return this.http.delete<ResponseData<any>>(
      `${this.preferences_apiurl}/${id}`,
      {
        headers: this.getHeaders(
          this.localStorageService.getData('x-authorization-c-token')
        ),
      }
    );
  }

  findAndDeletePreference(
    id_prefere: string,
    designation: string
  ): Observable<ResponseData<any>> {
    const data: PreferenceForm = {
      id_customer:
        this.localStorageService.getDecodedAccessToken(
          this.localStorageService.getData('x-authorization-c-token')
        )?._id || '',
      id_prefere,
      designation,
    };
    return this.http.post<ResponseData<any>>(
      `${this.preferences_apiurl}/delete`,
      data,
      {
        headers: this.getHeaders(
          this.localStorageService.getData('x-authorization-c-token')
        ),
      }
    );
  }
}
