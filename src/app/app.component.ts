import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private _route: Router, private _auth: AuthService) {  }

  logout() {
    this._auth.logout();
  }

  isLoggedIn() {
    return this._auth.isAuthenticated();
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }
}
