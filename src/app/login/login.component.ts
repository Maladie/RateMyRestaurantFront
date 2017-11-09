import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Login } from './login';
import { Router } from '@angular/router';
import { ResponseInfo } from '../responseinfo';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: Login;
  result;
  headers: string[];
  errors;
  response;
  test;
  constructor(private http: HttpClient, private _router: Router) {
      this.model = new Login('', '');
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('url: ' + environment.serverEndpoint + '/login');
    const h = new HttpHeaders().append('Authorization', 'Basic ' + btoa(this.model.username + ':' + this.model.password))
    .append('Content-Type', 'application/json');
    this.http
    .post<ResponseInfo>(environment.serverEndpoint + '/api/login', this.model, {headers: h, observe: 'response', withCredentials: true})
    .subscribe(resp => {
      this.headers = resp.headers.getAll('Set-Cookie');
      this.test = JSON.stringify(resp.headers.get('X-XSRF-TOKEN'));
      this.result = JSON.stringify(resp.body);
      console.log(JSON.stringify(document.cookie));
      // this.response = JSON.stringify(resp);
        // localStorage.setItem('token',.get('X-XSRF-TOKEN'));
    }, err => {
      console.log(err);
      this.errors = JSON.stringify(err);
    });
  }
  home() {
      this._router.navigate(['']);
  }
  testClick() {
    this.http.get(environment.serverEndpoint + '/api/test', {withCredentials: true}).subscribe(resp => {
      this.test = JSON.stringify(resp);
    }, err => {
      this.test = JSON.stringify(err);
    });
  }
}
