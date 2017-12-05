import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from './login-data';
import { AuthService } from '../shared/auth.service';
import { ResponseInfo } from '../shared/response-info';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { VotingLockService } from '../shared/voting-lock.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginData;
  result: ResponseInfo;
  processingAnim = false;
  constructor(private _location: Location, private _auth: AuthService, public dialogRef: MatDialogRef<LoginComponent>, private dialog: MatDialog) {
    this.model = new LoginData('', '');
    this.result = new ResponseInfo();
  }

  ngOnInit() {
  }

  submit() {
    this.processingAnim = true; // show animation
    this.result.code = -1; // reset before response + hide error label
    this._auth.loginUser(this.model).subscribe(ok => {
      this.processingAnim = false; // hide animation
      this.dialogRef.close();
    }, nok => {
      this.processingAnim = false; // hide animation
      console.log('nok ' + nok);
      this.result = nok.error as ResponseInfo;
    });
  }

  register() {
    // dialogs chain login -> register(if register success and autologin:true => new user details with response) -> login
    const result = this.dialog.open(RegisterComponent, { width: '400px', data: { username: null, password: null } });
    result.afterClosed().subscribe(resp => {
      // close this dialog if autologin successfully logged-in user
      if (this._auth.isAuthenticated()) {
        this.dialogRef.close();
      }
    });
  }
}
