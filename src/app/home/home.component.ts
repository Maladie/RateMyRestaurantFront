import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notSupported: string;
  constructor(private _route: Router) {
      this.notSupported = '';
  }

  ngOnInit() {
  }

  login() {
      this._route.navigate(['/login']);
  }

  map() {
      this._route.navigate(['/map']);
  }

  register() {
      this._route.navigate(['/register']);
  }
}
