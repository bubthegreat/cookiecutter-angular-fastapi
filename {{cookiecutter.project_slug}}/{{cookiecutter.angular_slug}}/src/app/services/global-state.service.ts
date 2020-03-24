import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';
import { MatSnackBar } from '@angular/material';
import { IStatus } from '../interfaces/istatus';
import { ApiService } from './api.service';


export enum AuthActions {
  LogIn = 'Log In',
  LogOut = 'Log Out',
}

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  constructor(
    private router: Router,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) {}

  loginStatus = false;
  loginToken = null;
  authAction = AuthActions.LogIn;
  user: IUser = null
  status: IStatus = null;

  doLogin(formData) {
    this.loginStatus = true;
    this.api.getToken(formData)

    this.authAction = AuthActions.LogOut
    this.user = {
      username: formData.username,
      email: '{{cookiecutter.author_email}}',
      firstName: 'Micheal',
      lastName: 'Taylor',
      aboutMe: "I'm just a guy trying to learn how all this frontend stuff works.",
      token: null
    }
    console.log("I do a login.");
    this.router.navigate(['/'])
    this.notify("Successfully logged in.")
  }

  doLogout() {
    this.loginStatus = false;
    this.loginToken = null;
    this.authAction = AuthActions.LogIn;
    this.router.navigate(['/'])
    this.notify("Successfully logged out.")
    console.log("I do a logout.");
  }

  doRegister(username: string, password: string) {
    console.log("I totally registered someone!  WOOHOO!!");
    console.log(username, password);
    this.router.navigate(['/'])
  }

  notify(message: string): void {
    this._snackBar.open(
      message,
      "Dismiss", {
        duration: 2000,
        verticalPosition: 'top'
      }
    );
    }

}
