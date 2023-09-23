import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginResponse } from '../interfact/i-login-response ';
import { Observable } from 'rxjs';
import { IRegisterResponse } from '../interfact/i-register-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<ILoginResponse> {
    let url = "http://localhost:8080/user/login";
    let body = {
      email: email,
      password: password
    }
    return this.http.post<ILoginResponse>(url, body);
  }

  register(email: string, password: string, name: string): Observable<IRegisterResponse> {
    let url = "http://localhost:8080/user/register";
    let body = {
      email: email,
      password: password,
      name: name
    }
    return this.http.post<IRegisterResponse>(url, body);
  }

}
