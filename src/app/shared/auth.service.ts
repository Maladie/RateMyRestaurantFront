import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenInfo } from './token-info';
import { SessionToken } from './session-token';
import { WebApiObservableService } from './web-api-obserable.service';
import { HttpHeaders } from '@angular/common/http';
import { LoginData } from '../login/login-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { ResponseInfo } from './response-info';
import { resolve, reject } from 'q';
import { VotingLockService } from './voting-lock.service';

@Injectable()
export class AuthService {
  val: ResponseInfo = new ResponseInfo();
  constructor(private voteLock: VotingLockService, private _router: Router, private _webApiObservable: WebApiObservableService, ) {
  }
  public getToken(): string {
    const sessionToken = JSON.parse(sessionStorage.getItem('token')) as SessionToken; // Parsing to obj
    if (sessionToken != null) {
      return sessionToken.token;
    }
    return '';
  }
  public loginUser(loginData: LoginData) {
    const result =
      new Promise<ResponseInfo>((resolve, reject) => {
        this._webApiObservable.loginToWebApi(loginData).subscribe(resp => {
          const token = this.parseTokenData();
          const expirationTime = this.parseExpirationTime(resp.headers);
          const tokenInfo = new TokenInfo(token, expirationTime);
          this.saveToken(tokenInfo);

          sessionStorage.setItem('username', loginData.username);
          console.log('login ok');
          resolve(resp.body);
        }, err => {
          console.log('login err: ' + JSON.stringify(err));
          sessionStorage.removeItem('username');
          reject(err);
        });
      });
    return Observable.fromPromise(result);
  }
  clearResponse() {
    this.val = null;
  }

  private getTokenInfo(): SessionToken {
    return JSON.parse(sessionStorage.getItem('token')) as SessionToken;
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    return token !== '';
    // TODO return tokenNotExpired(null, token);
  }
  public saveToken(tokenInfo: TokenInfo) {
    const expireDate = new Date().getTime() + (1000 * tokenInfo.expires_in);
    const sessionToken = new SessionToken(expireDate, tokenInfo.access_token);
    sessionStorage.setItem('token', JSON.stringify(sessionStorage));
  }
  public logout() {
    this.voteLock.clearVotingMap();
    sessionStorage.removeItem('token');
  }

  private checkIfExpired(): boolean {
    const sessionToken = this.getTokenInfo();
    return new Date().getTime() > sessionToken.expiresAt;
  }

  private parseTokenData(): string {
    const token = document.cookie.split('=')[1];
    if (token !== undefined && token !== null) {
      console.log('token retrieved and saved');
      return token;
    }
    return '';
  }

  private parseExpirationTime(headers: HttpHeaders): number {
    const expiresIn = headers.get('Token-expirationTime');
    if (expiresIn !== undefined && expiresIn !== null) {
      return parseInt(expiresIn, 10);
    }
    return 0;
  }
}
