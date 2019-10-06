import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { interval } from 'rxjs';
import { IStatus } from '../istatus';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  status: IStatus;
  secondsCounter = interval(1000);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.secondsCounter.subscribe(
      seconds => {
        this.getStatus();
      });
    
  }

  getStatus() {
    this.api.getStatus().subscribe(
      status => {
        this.status = status; 
      });
  }

}
