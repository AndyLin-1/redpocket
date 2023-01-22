import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import { MyHttpService } from './my-http.service';
import {CreateRequestInterface} from "../models/create-request.interface";

const apiUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class RedpocketService {

  constructor(private http: MyHttpService) { }

  /*
  Gets Red Pocket Info Uncensored
   */
  get(id: string, code: string): Observable<any> {
    return this.http.get(`${apiUrl}/redpocket/${id}/${code}`);
  }

  /*
  authorized the code to switch views
   */
  auth(id: string, code: string): Observable<any> {
    return this.http.get(`${apiUrl}/redpocket/auth/${id}/${code}`);
  }

  /*
  Request to Create Red Pocket
   */
  createRedPocket(createRequest: CreateRequestInterface): Observable<any>{
    return this.http.post(`${apiUrl}/redpocket`, createRequest);
  }

  /*
  Open RedPocket
   */
  openRedPocket(id: string, input: string): Observable<any>{
    return this.http.post(`${apiUrl}/redpocket/open/${id}`, input);
  }


}
