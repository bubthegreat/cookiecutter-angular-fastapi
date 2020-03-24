import { Injectable } from '@angular/core';
import * as moment from "moment";
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { tap } from "rxjs/operators";

const baseAPIURL = 'http://{{cookiecutter.domain}}:{{cookiecutter.api_port}}/'
const tokenURL = baseAPIURL + 'token'


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient,
    ) { }

  login(email: string, password: string) {
    return this.http.post<IUser>(tokenURL, {email, password})
      .pipe(tap(res => this.setSession));
  }

  private setSession(authResult) {
    console.log(authResult)
    const expiresAt = moment().add(authResult.expiresIn,'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }
}
