import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    notSupported: string;
    constructor(private _route: Router, private _auth: AuthService) {
        this.notSupported = '';
    }

    ngOnInit() {
    }

    login() {
        this._route.navigate(['/login']);
    }

    logout() {
        this._auth.logout();
    }
    isLoggedIn() {
        return this._auth.isAuthenticated();
    }

    map() {
        this._route.navigate(['/map']);
    }

    register() {
        this._route.navigate(['/register']);
    }
}
