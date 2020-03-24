import { Component, OnInit } from '@angular/core';
import { GlobalStateService } from '../../services/global-state.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  constructor(private state: GlobalStateService) { }

  get user () {
    return this.state.user;
  }

}
