import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders,HttpResponse } from '@angular/common/http';

import { JwtUser } from '../model/jwtUser';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username : string;
  private password : string;
  private usernameError: boolean;
  private passwordError: boolean;

  private jwtUser : JwtUser;

  constructor(private loginService: LoginService, private router: Router, private http: HttpClient) { 
    console.log("Inside Login Component Constructor");
  }

  ngOnInit() {

    this.jwtUser = new JwtUser();
    this.jwtUser.username = "";
    this.jwtUser.password = "";
    this.jwtUser.userType = "";
    this.usernameError=false;
    this.passwordError=false;
  }

  login() {
    if(!this.jwtUser.username){	
			this.usernameError=true;
		}
		else{
			this.usernameError=false;
		} 
		if(!this.jwtUser.password){
			this.passwordError=true;
		}
		else{
			this.passwordError=false;
    }
    
    if(this.jwtUser.username && this.jwtUser.password){
      console.log('Username: ',this.jwtUser.username);
      console.log('Password: ',this.jwtUser.password);
      this.loginService.login(this.jwtUser).subscribe(
        (res) => {
          var payload = res.body;
          console.log('Response: ',res);
          console.log('Response body: ',payload);
          
          var userType = JSON.stringify(payload.userType);
          console.log("User Type: ",userType);
          if(userType == '"User"') {
            console.log("Navigating to User Dashboard");
            this.router.navigate(["dashboard"])
          }
          else {
            console.log("Navigating to Admin Dashboard");
            this.router.navigate(["admin"])
          }
        },
          (err) => {
            console.log(err);
          }
      );
    
    }
  }

  openRegistrationPage() {
    this.router.navigate(["registration"]);
  }

}
