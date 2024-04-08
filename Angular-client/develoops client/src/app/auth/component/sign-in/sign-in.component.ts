import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
//import jwt_decode from 'jwt-decode';
// import jwt from 'jsonwebtoken';


import { FormBuilder } from '@angular/forms';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  loginForm2!: FormGroup;
  constructor(private router: Router, private http: HttpClient, private _userService: UserService, private formBuilder: FormBuilder,   private socialAuthService: SocialAuthService) { }
  onCategorySelected(): void {
    this.router.navigate(["/show-question"]);
  }
  //constructor(private _studentService: StudentService) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "userName": new FormControl("", [Validators.required]),
      "password": new FormControl("", [Validators.required]),
    })
    this.loginForm2 = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
  }) 
  this.socialAuthService.authState.subscribe((user) => {
    this.socialUser = user;
    this.isLoggedin = user != null;
    console.log(this.socialUser);
   
    
    const token = this.socialUser.idToken;
    
const parts = token.split('.');

const payload = JSON.parse(atob(parts[1]));

const exp = payload['exp'];//תוקף
const ait = payload['iat'];//יצירה
console.log(exp)
console.log(ait)
console.log(this.socialUser.email)
console.log(typeof(this.socialUser.email))
this._userService.getUserByMail(this.socialUser.email).subscribe({
  next: (res) => {
    console.log(res);
    
    console.log("okkkk");
    const token = this.socialUser.idToken;
    const user = res;
    const currentTime=res.currentTime;
    // Now you can use the token as needed
    // For example, you might want to save the token in sessionStorage
    localStorage.setItem('token', token);
     localStorage.setItem('user', JSON.stringify(user));
    localStorage.removeItem('currentTime');
    localStorage.removeItem('expiration');
    localStorage.setItem('ait', ait);
    localStorage.setItem('exp', exp);

    // this._userService.setCurrentUser(res);

  },
  error: (err) => {

    console.error(err);
    console.log("An error occurred while parsing the response.");
  }
});
//     const decodedToken = jwt_decode.jwtDecode(token);
//  const expirationTime = decodedToken.exp;
//  const iatTime = decodedToken.iat;

  });


}
loginWithGoogle(): void {
  this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
}
logOut(): void {
  this.socialAuthService.signOut();
}
  
  customPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value: string = control.value || '';
    const letterCount = (value.match(/[a-zA-Z]/g) || []).length;
    const numberCount = (value.match(/\d/g) || []).length;

    // Check if the password has at least two letters and three numbers
    if (letterCount >= 2 && numberCount >= 3) {
      return null; // Validation passed
    } else {
      return { 'customPasswordValidator': true }; // Validation failed
    }
  }
  moveSignUp() {
    this.router.navigate(['/auth/SignUp']);
  }
  save() {
    console.log(this.loginForm.value);
    let s = this.loginForm.value;
    console.log(s);
    this._userService.login(s.userName, s.password).subscribe({
      next: (res) => {
        console.log(res);
        res = JSON.parse(res);
        
        console.log("okkkk");
        const token = res.token;
        const user = res.userDto;
        const parts = token.split('.');
        const payload = JSON.parse(atob(parts[1]));
        const exp = payload['exp'];//תוקף
        // Now you can use the token as needed
        // For example, you might want to save the token in sessionStorage
        localStorage.setItem('token', token);
        // localStorage.setItem('user', JSON.stringify(user));
//         document.cookie="user="+JSON.stringify(user)
// console.log(document.cookie);
        localStorage.setItem('exp', exp);
     
        // this._userService.setCurrentUser(res);
        this.router.navigate(['/home']);
      },
      error: (err) => {

        console.error(err);
        console.log("An error occurred while parsing the response.");
      }
    });
  }
}
