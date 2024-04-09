import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,AbstractControl  } from '@angular/forms';
import {  UserDto } from '../../../models/userDto.model';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  SignUpForm!: FormGroup;
  selectedImageUrl: string = '';
   addUser!:UserDto;
   selectedImage!: File;
   images: any[] = [];
   errorMessage!: string;
   searchText = new FormControl('');
   selectImg!:string;
  constructor(private _userService:UserService,private router:Router ) { }
isExist!:false;
  //constructor(private _studentService: StudentService) { }
  ngOnInit(): void {
    this.SignUpForm = new FormGroup({ 
       "Username": new FormControl("", [Validators.required, Validators.minLength(2)]),
      "Password": new FormControl( "",[Validators.required, this.customPasswordValidator]),
      "FirstName": new FormControl("", [Validators.required, Validators.minLength(2)]),
      "LastName": new FormControl("", [Validators.required, Validators.minLength(2)]),
      "Email": new FormControl("", [Validators.required, Validators.email]),
      "FileImage": new FormControl(null),
      "Img":new FormControl(null),
     "Role": new FormControl('Geeky'),
     "PhoneNumber":new FormControl('0522252524'),  
    })

  }

  onTextChange(): void {
    const val = this.searchText.value;
    if (val === '') {
      this.images = [];
    } else if(val !== null){
      this._userService.getImages(val)
        .subscribe(
          data => {
            this.images = data.hits;
            console.log(this.images)
          },
          error => {
            console.log(error);
          }
        );
    }
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
  onFileChange(event: any): void {
     const file =event.target.files[0];
    this.selectedImage = event.target.files[0];
  }
  signUp(){
    let user = this.SignUpForm.value;
    
    const formData = new FormData();
    formData.append("FileImage" , this.selectedImage);
    formData.append("Img" , this.selectImg);
    formData.append('FirstName', user.FirstName);
    formData.append('LastName', user.LastName);
    formData.append('Email', user.Email);
    formData.append('Username', user.Username);
    formData.append('Role', user.Role);
    formData.append('Password', user.Password);
    formData.append('PhoneNumber',"052552522");
  
     this._userService.postUser(formData).subscribe({
    next: (res) => {
      console.log(res.email);
  
      this.router.navigate(['/auth/SignUp']);
   
      this._userService.sendEmail(res.email,"Welcome to develooops 🤩🤩","Hey Happy to have you join  to our website .  From now on you can ask questions and get answers. and help friends."
    
    
    ).subscribe({
        next: (res) => {
          console.log(res);
        
        },
        error: (err) => {
  
          console.error(err);
          console.log("An error occurred while parsing the response.");
          if (err.status === 200) {
            this.router.navigate(['/auth/SignIn']);
          }
        }
      });
    
    },
    
    error: (err) => {  
      console.error("Registration failed", err.message);
      console.log("Server error details:", err.error);
      if (err.status === 400) {
        console.log("Client error - Bad Request");
        this.errorMessage = "exist username";

        // טיפ: כאן תוכל לעשות משהו כמו להציג הודעה למשתמש על טעות בקלט שלו
        
      } else if (err.status === 500) {
        console.log("Server error - Internal Server Error");
        this.errorMessage = "something error";
        // טיפ: כאן תוכל לעשות משהו כמו להציג הודעה למשתמש על שגיאה בשרת
      } 
    
         
    
    }
  });
  }
   save() {
   }
   moveSignIn() {
    this.router.navigate(['/auth/SignIn']);
  }
  onImageSelect(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }
  onImageClick(image: any) {
  
    this.selectImg=image.largeImageURL; 
     console.log( image.largeImageURL);
  }
  }

