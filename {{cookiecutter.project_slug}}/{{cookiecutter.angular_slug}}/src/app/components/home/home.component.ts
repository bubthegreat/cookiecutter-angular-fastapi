import { Component, OnInit } from '@angular/core';
import { GlobalStateService } from '../../services/global-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private state: GlobalStateService) { }

  get loggedIn () {
    return this.state.loginStatus;
  }

}
