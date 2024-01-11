import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
 // Adjust the path based on your project structure

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isValid: Boolean;
  signUpForm: FormGroup;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.isValid=true;
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
     
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
          // Handle successful sign-up
          console.log('Sign-up successful:', response);
        },
        (error) => {
          // Handle sign-up error
          console.error('Sign-up error:', error);
        }
      );
    }else{
      this.isValid=false
    }
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.signIn(username, password).subscribe(
        (response) => {
          // Handle successful login
          console.log('Login successful:', response);
        },
        (error) => {
          // Handle login error
          console.error('Login error:', error);
        }
      );
    } else {
      this.isValid=false
    }
  }

  
}
