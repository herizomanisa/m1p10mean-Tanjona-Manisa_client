import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }

  public getDecodedAccessToken(token: string | null): {
    _id: string;
    nom: string;
    role: string;
    iat: number;
  } | null {
    try {
      if (token) return jwt_decode.jwtDecode(token);
      return null;
    } catch (Error) {
      return null;
    }
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
