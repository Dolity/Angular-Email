import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppCookieService } from 'src/app/services/app-cookie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService,
    private appCookieService: AppCookieService,
    private router: Router
  ) { }

  ngOninit(): void {

  }

  onSubmit(): void {
    // ตรวจสอบว่าทั้ง email และ password มีค่า
    if (
      this.loginFormGroup.controls['email'].value &&
      this.loginFormGroup.controls['password'].value
    ) {
      let email = this.loginFormGroup.controls['email'].value;
      let password = this.loginFormGroup.controls['password'].value;

      this.userService.login(email, password).subscribe((response) => {
        this.appCookieService.setAccessToken(response.token);
        this.router.navigate(['/dashboard']);
      }, (error) => {
        alert(error.error.error);
      });
    } else {
      console.log('Please provide both email and password.');
    }
  }
}
