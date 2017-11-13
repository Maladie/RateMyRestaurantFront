import { NgModule, Component, Pipe, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginData } from '../login/login-data';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EqualityValidatorDirective } from '../shared/equality-validator.directive';
import { RegisterData } from './register-data';
import { WebApiObservableService } from '../shared/web-api-obserable.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  result;
  myform: FormGroup;
  username: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  autologin: FormControl;
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

  // onSubmit() {
  //   console.log('url: ' + environment.serverEndpoint + '/register');
  //   const h = new HttpHeaders().append('Authorization', 'Basic ' + btoa(this.model.username + ':' + this.model.password));
  //   const body = new HttpParams().append('username', this.model.username).append('password', this.model.password);
  //   this.http.post(environment.serverEndpoint + '/register', this.model, { headers: h, withCredentials: true })
  //     .subscribe(data => {
  //       this.result = JSON.stringify(data);
  //       this.result = JSON.stringify(this.result);
  //     });
  // }
  home() {
    this._router.navigate(['']);
  }
  onSubmit() {
    if (this.myform.valid) {
      const h = new HttpHeaders().append('Authorization', 'Basic ' + btoa(this.username.value + ':' + this.password.value));
        // const body = new HttpParams().append('username', this.username.value).append('password', this.password.value);
        const registerData = new RegisterData(this.username.value, this.password.value);
        this.http.post(environment.serverEndpoint + '/register', registerData, { headers: h, withCredentials: true })
          .subscribe(data => {
            this.result = JSON.stringify(data);
            this.result = JSON.stringify(this.result);
          });
      console.log('submitted');
    } else {
      console.log('not submitted');
    }
  }
}
