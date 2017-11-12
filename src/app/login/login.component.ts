import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from './login-data';
import { AuthService } from '../shared/auth.service';
import { ResponseInfo } from '../shared/response-info';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  model: LoginData;
  response: ResponseInfo;
  constructor(private _router: Router , private _auth: AuthService) {
    this.model = new LoginData('', '');
    this.response = new ResponseInfo();
  }

  ngOnInit() {
  }

  submit() {
    const response = this._auth.loginUser(this.model);
  }
  home() {
    this._router.navigate(['']);
  }
}
