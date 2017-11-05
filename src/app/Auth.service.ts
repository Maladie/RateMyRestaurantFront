import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {

    constructor(
        private _router: Router, private _http: HttpClient) { }

    obtainAccessToken(loginData) {
        const params = new HttpParams()
            .append('username', loginData.username)
            .append('password', loginData.password)
            .append('grant_type', 'password')
            .append('user_id', 'userIdPassword');
        const _headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf8',
            'Authorization': 'Basic ' + btoa('userIdPassword')
        });
        this._http.post(environment.serverEndpoint + '/login', { params: params }, { headers: _headers }).subscribe(
            data => this.saveToken(data),
            err => alert('Invalid Credentials'));
    }
    saveToken(token) {
        const expireDate = new Date().getTime() + (1000 * token.expires_in);
        sessionStorage.set('access_token', token.access_token, expireDate);
        this._router.navigate(['/']);
    }

    checkCredentials() {
            this._router.navigate(['/login']);
    }

    logout() {
        sessionStorage.delete('access_token');
        this._router.navigate(['/']);
    }
}
