import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isValid: Boolean;
  successRegistre;
  signUpForm: FormGroup;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router : Router) {
    this.isValid=true;
    this.successRegistre=false;
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required]
    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      const { username, email, password,lastName,firstName,cin } = this.signUpForm.value;
      this.authService.signUp(username, email, password,lastName,firstName,cin).subscribe(
        (response) => {
          console.log('Sign-up successful:', response);
          this.successRegistre=true;
        },
        (error) => {
          console.error('Sign-up error:', error);
        }
      );
    }else{
      this.isValid=false
    }
  }

  loginFailed: boolean = false;


  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.signIn(username, password).subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/terrain']);
        },
        (error) => {
          console.error('Login error:', error);
          if (error.status === 401) {
            this.isValid = false;
          }
        }
      );
    } else {
      this.isValid = false;
    }
  }
  

  
}
