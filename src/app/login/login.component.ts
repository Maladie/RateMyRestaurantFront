import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LoginData } from './login-data';
import { ResponseInfo } from '../services/response-info';
import { TokenInfo } from '../services/token-info';
import { Headers } from '@angular/http/src/headers';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginData;
  result;
  headers: string[];
  errors;
  response;
  test;
  constructor(private http: HttpClient, private _router: Router , private _auth: AuthService) {
    this.model = new LoginData('', '');
  }

  ngOnInit() {
  }

  submit() {
    console.log('url: ' + environment.serverEndpoint + '/login');
    const h = new HttpHeaders().append('Authorization', 'Basic ' + btoa(this.model.username + ':' + this.model.password))
      .append('Content-Type', 'application/json');
    this.http
      .post<ResponseInfo>(environment.serverEndpoint + '/api/login', this.model, { headers: h, observe: 'response', withCredentials: true })
      .subscribe(resp => {
        const token = this.parseTokenData();
        const expirationTime = this.parseExpirationTime(resp.headers);
        const tokenInfo = new TokenInfo(token, expirationTime);
        this._auth.saveToken(tokenInfo);
        this._router.navigate(['/map']);
      }, err => {
        console.log(err);
      });
  }
  home() {
    this._router.navigate(['']);
  }
  testClick() {
    this.http.get(environment.serverEndpoint + '/api/test', { withCredentials: true }).subscribe(resp => {
      this.test = JSON.stringify(resp);
    }, err => {
      this.test = JSON.stringify(err);
    });
  }

  parseTokenData(): string {
    const token = document.cookie.split('=')[1];
    if (token !== undefined && token !== null) {
      console.log('token retrieved and saved');
      return token;
    }
    return '';
  }

  parseExpirationTime(headers: HttpHeaders): number {
    const expiresIn = headers.get('Token-expirationTime');
    if (expiresIn !== undefined && expiresIn !== null) {
      return parseInt(expiresIn, 10);
    }
    return 0;
  }
}
