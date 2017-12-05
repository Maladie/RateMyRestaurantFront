import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(private _route: Router, private _auth: AuthService, private dialog: MatDialog) { }

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

  login() {
    this.dialog.open(LoginComponent, { width: '380px' });
  }
}
