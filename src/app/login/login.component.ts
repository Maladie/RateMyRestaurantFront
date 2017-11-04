import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result: string[];
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  osSubmit(f: NgForm) {
    this.http.get(environment.serverEndpoint + '/login').subscribe(data => {
      this.result = data['results'];
      console.log('login response');
    });
  }
}
