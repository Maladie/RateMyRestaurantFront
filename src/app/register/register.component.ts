import { NgModule, Component, Pipe, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginData } from '../login/login-data';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EqualityValidatorDirective } from '../shared/equality-validator.directive';
import { RegisterData } from './register-data';
import { WebApiObservableService } from '../shared/web-api-obserable.service';
import { ResponseInfo } from '../shared/response-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  result: ResponseInfo = new ResponseInfo();
  resultCode = -1;
  myform: FormGroup;
  username: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  autologin: FormControl; // currently not supported
  constructor(private _webApiObservable: WebApiObservableService) { }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.username = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]);
    this.autologin = new FormControl(false);
  }

  createForm() {
    this.myform = new FormGroup({
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
      autologin: this.autologin
    });
  }

  onSubmit() {
    console.log('R' + this.result.code);
    if (this.myform.valid) {
      const h = new HttpHeaders().append('Authorization', 'Basic ' + btoa(this.username.value + ':' + this.password.value));
      const registerData = new RegisterData(this.username.value, this.password.value);
      console.log('Submitted');
      this._webApiObservable.addNewUserJSON(registerData)
        .subscribe(data => {
          this.result = data as ResponseInfo;
          this.resultCode = this.result.code;
          console.log(data);
        }, err => {
          console.log('Registration error!');
          this.result = err;
          this.resultCode = this.result.code;
          console.log(err);
        });
    } else {
      console.log('Not submitted, invalid data');
    }
  }
}
