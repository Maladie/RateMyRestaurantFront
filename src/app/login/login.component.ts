import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Login } from './login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: Login;
  result;
  constructor(private http: HttpClient, private _router: Router) {
      this.model = new Login('', '');
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('url: ' + environment.serverEndpoint + '/login');
    const h = new HttpHeaders().append('Authorization', 'Basic ' + btoa(this.model.username + ':' + this.model.password))
    .append('Content-Type', 'application/json');
    this.http.post(environment.serverEndpoint + '/api/login', this.model, {headers: h, withCredentials: true})
    .subscribe(data => {
            this.result = data;
      this.result = JSON.stringify(this.result);
    });
  }
  home() {
      this._router.navigate(['']);
  }
}
