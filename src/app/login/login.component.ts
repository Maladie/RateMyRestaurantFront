import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from './login-data';
import { AuthService } from '../shared/auth.service';
import { ResponseInfo } from '../shared/response-info';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { VotingLockService } from '../shared/voting-lock.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginData;
  result: ResponseInfo;
  constructor(private _location: Location, private _auth: AuthService) {
    this.model = new LoginData('', '');
    this.result = new ResponseInfo();
  }

  ngOnInit() {
  }

  submit() {
    this._auth.loginUser(this.model).then(ok => {
      this.result = ok as ResponseInfo;
      // temporary
      sessionStorage.setItem('username', this.model.username);
      this._location.back();
    }, nok =>{
      console.log('nok ' +nok);
      this.result = nok.error as ResponseInfo;
      // temporary
      sessionStorage.removeItem('username');
    });
  }
}
