import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { LoginData } from '../login/login-data';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    notSupported: string;
    constructor(private _route: Router, private _auth: AuthService, private dialog: MatDialog) {
        this.notSupported = '';
    }

    ngOnInit() {
    }

    isLoggedIn() {
        return this._auth.isAuthenticated();
    }
    register() {
        const response = this.dialog.open(RegisterComponent, { width: '400px' });
        response.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this._auth.loginUser(result as LoginData).subscribe();
            }
        });
    }
}
