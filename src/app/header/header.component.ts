import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _route: Router, private _auth: AuthService) { }

  ngOnInit(): void {
  }

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
