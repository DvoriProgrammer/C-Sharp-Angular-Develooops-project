import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignInComponent } from './auth/component/sign-in/sign-in.component';
import { SignUpComponent } from './auth/component/sign-up/sign-up.component';
import { CommonErrorsComponent } from './components/common-errors/common-errors.component';
//import { ShowQuestionComponent } from './components/question/component/show-question/show-question.component';
//import { SuccessComponent } from './components/question/component/success/success.component';

//
import { Question } from './models/question.model';
import { MyAccountComponent } from './auth/component/my-account/my-account.component';
import { checkUserGuard } from './guard/check-user.guard';
export const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
{path:"myAccount",component:MyAccountComponent,canActivate: [checkUserGuard]},
    { path: "home", component: HomeComponent },
    // { path: "home/menu", component: MenuDilogComponent },
    { path: "about", component: AboutComponent },
    { path: "CommonErrors", component: CommonErrorsComponent },
    { path: "question", loadChildren: () => import('./components/question/question.module').then(m => m.QuestionModule) },
    { path: "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    // { path: "show-question/:id", component:  ShowQuestionComponent },
    //     { path: "card-question", component:CardQuestionComponent },
    //     { path: "add-question", component:AddQuestionComponent },
    //     { path: "success", component:SuccessComponent },
    { path: '**', component: NotFoundComponent }
];

