import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class EventService { 

  constructor(private http:Http){
  }
  
  
saveEvent(event:any):any{
	//let userDetais = JSON.parse( sessionStorage.getItem("UserSignUpDetails") );
	
    let body = {event};
    let headers = new Headers(); //'Access-Control-Allow-Origin': '*'
    headers.append('Content-Type', 'application/json' );   
    let options = new RequestOptions({ headers: headers });
     return this.http.post('http://localhost:4200/validateUser',body, options).map(res => res.json());
}


}