import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { AuthModuleRouting } from './auth.routing.module';
import { MyAccountComponent } from './component/my-account/my-account.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule } from '@angular/forms'; // ייבוא ה-FormsModule


import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { QuestionModule } from '../../app/components/question/question.module'


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    MyAccountComponent,
 
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    ReactiveFormsModule, HttpClientModule, AuthModuleRouting,SocialLoginModule,FormsModule,QuestionModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '427515481723-ja7nlkmti3amubd5e5qbtdig27fc06ik.apps.googleusercontent.com'
            )
          },
         
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
})
export class AuthModule { }
