import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from '../login/login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
result;
model = new Login('', '');
  constructor(private http: HttpClient, private _router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log('url: ' + environment.serverEndpoint + '/register');
    const h = new HttpHeaders().append('Authorization', 'Basic ' + btoa(this.model.username + ':' + this.model.password));
    const body = new HttpParams().append('username', this.model.username).append('password', this.model.password);
    this.http.post(environment.serverEndpoint + '/register', this.model, {headers: h, withCredentials: true})
    .subscribe(data => {
            this.result = JSON.stringify(data);
      this.result = JSON.stringify(this.result);
    });
  }
  home() {
      this._router.navigate(['']);
  }
}
