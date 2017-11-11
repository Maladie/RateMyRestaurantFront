import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenInfo } from './token-info';
import { SessionToken } from './session-token';

@Injectable()
export class AuthService {
  constructor(private _router: Router) {
  }
  public getToken(): string {
    const sessionToken = JSON.parse(sessionStorage.getItem('token')) as SessionToken; // Parsing to obj
    if (sessionToken != null) {
      return sessionToken.token;
    }
    return '';
  }
  private getTokenInfo(): SessionToken {
    return JSON.parse(sessionStorage.getItem('token')) as SessionToken;
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    return token !== null; // TODO tokenNotExpired(null, token);
  }
  public saveToken(tokenInfo: TokenInfo) {
    const expireDate = new Date().getTime() + (1000 * tokenInfo.expires_in);
    const sessionToken = new SessionToken(expireDate, tokenInfo.access_token);
    sessionStorage.setItem('token', JSON.stringify(sessionStorage)); // convert to string JSON
    this._router.navigate(['/']);
  }
  public logout() {
    sessionStorage.delete('token');
    this._router.navigate(['/']);
  }

  private checkIfExpired(): boolean {
    const sessionToken = this.getTokenInfo();
    return new Date().getTime() > sessionToken.expiresAt;
  }
}
