import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { IStatus } from './istatus';


const baseAPIURL = 'http://localhost:8000/'
const statusURL = baseAPIURL + 'status'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getStatus() {
    return this.http.get<IStatus>(statusURL);
  }
}
