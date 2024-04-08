import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { CommonModule } from '@angular/common'; // הוסף את ה-import של CommonModule

const authRoutes: Routes = [
  { path: "SignIn", component: SignInComponent },
  { path: "SignUp", component: SignUpComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, // הוסף את CommonModule כחלק מה-imports
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthModuleRouting { }