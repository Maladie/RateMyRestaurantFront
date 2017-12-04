import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    if (this.myform.valid) {
      const h = new HttpHeaders().append('Authorization', 'Basic ' + btoa(this.username.value + ':' + this.password.value));
      const registerData = new RegisterData(this.username.value, this.password.value);
      console.log('Submitted');
      this._webApiObservable.addNewUserJSON(registerData)
        .subscribe(data => {
          this.result = data as ResponseInfo;
          console.log(data);
        }, err => {
          console.log('Registration error!');
          this.result = err;
          console.log(err);
        });
    } else {
      console.log('Not submitted, invalid data');
    }
  }
}
