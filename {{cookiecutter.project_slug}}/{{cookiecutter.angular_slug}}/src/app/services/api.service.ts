import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStatus } from '../interfaces/istatus';
import { Observable } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { IToken } from '../interfaces/token';




const baseAPIURL = 'http://{{cookiecutter.domain}}:{{cookiecutter.api_port}}/'
const statusURL = baseAPIURL + 'status'
const tokenURL = baseAPIURL + 'token'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    ) { }

  getStatus(): Observable<IStatus> {
    // return of ({status: 'up', uptime: '1234', server_time: "Jan 1 1984"});
    const resp$ = this.http.get<IStatus>(statusURL);
    resp$.subscribe(status => console.log(status));
    return resp$;
  }

  getToken(loginForm) {
    // return of ({status: 'up', uptime: '1234', server_time: "Jan 1 1984"});
    console.log("Posting formdata: ", loginForm);
    const formData = new FormData();
    formData.append('username', loginForm.username);
    formData.append('password', loginForm.password);
    formData.append('grant_type', 'password');

    const token$ = this.http.post<IToken>(tokenURL, formData);
    token$.subscribe((result) => {
      console.log(result);
      localStorage.setItem('access_token', result.access_token);
      console.log("Set local storage with token");
      console.log(localStorage.getItem("access_token"));
    });
  }

}
