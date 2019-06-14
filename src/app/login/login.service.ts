import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtUser } from '../model/jwtUser';
//import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

    authUrl = "http://localhost:8080/login/auth";

    private headers = new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }
      );

    constructor(private http: HttpClient) {
        console.log('Inside Login Service Constructor');
    }

    login(jwtUser:JwtUser):Observable<any> {	
        alert(this.authUrl);
        return this.http.post(
                this.authUrl, 
                jwtUser,
                {headers: this.headers, observe: "response"}
        )	
    }
}