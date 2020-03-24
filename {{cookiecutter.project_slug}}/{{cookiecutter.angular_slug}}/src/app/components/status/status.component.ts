import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { interval, Subscription } from 'rxjs';
import { IStatus } from '../../interfaces/istatus';
import { GlobalStateService } from 'src/app/services/global-state.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  secondsCounter = interval(1000);
  subscription: Subscription;

  constructor(
    private api: ApiService,
    private state: GlobalStateService,
    ) { }

  ngOnInit() {
    this.subscription = this.secondsCounter.subscribe(
      seconds => {
        let status$ = this.api.getStatus();
        status$.subscribe(status => this.state.status = status);
      });
      console.log("Subscribed to timer with getStatus()")

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log("Unsubscribed the getStatus() call.")
  }

  get status() {
    return this.state.status;
  }

}
