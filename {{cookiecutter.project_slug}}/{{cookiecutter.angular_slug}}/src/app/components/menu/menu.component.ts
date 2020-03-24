import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStateService } from '../../services/global-state.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    private state: GlobalStateService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
  }

  logIn(): void {
  }

  logOut(): void {
    this.state.doLogout()
  }

  doProfileAction(): void {
    if (this.state.loginStatus == true) {
      this.router.navigate(['profile'])
    }
    else {
      this._snackBar.open(
        "Please log in to see your profile!",
        "Dismiss", {
          duration: 2000,
          verticalPosition: 'top'
        }
      );
    }
  }

  doUserAuthAction(): void {
    if (this.state.loginStatus == true) {
      this.state.doLogout();
    }
    else {
      this.router.navigate(['login'])
    }
  }

  get authAction () {
    return this.state.authAction;
  }

  get token () {
    return this.state.loginToken;
  }

  get status () {
    return this.state.loginStatus;
  }

  get email () {
    var result: string;
    if (this.state.user != null) {
      result = this.state.user.email;
    }
    else {
      result = null;
    }
    return result;
  }
}
