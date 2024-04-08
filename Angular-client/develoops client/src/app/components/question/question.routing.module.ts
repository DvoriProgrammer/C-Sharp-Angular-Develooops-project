import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowQuestionComponent } from './component/show-question/show-question.component';
import { CardQuestionComponent } from './component/card-question/card-question.component';
import { AddQuestionComponent } from './component/add-question/add-question.component'
import { SuccessComponent } from './component/success/success.component';
import { DailyQuestionComponent } from './component/daily-question/daily-question.component';
import { addDailyQuestionGuard } from '../../guard/add-daily-question.guard';
import { checkUserGuard } from '../../guard/check-user.guard';

const questionRoute: Routes = [
  { path: "show-question/:id/:name", component: ShowQuestionComponent },
  { path: "card-question/:id", component: CardQuestionComponent },
  { path: "add-question/:id", component: AddQuestionComponent, canActivate: [checkUserGuard] },
  { path: "success", component: SuccessComponent },
  { path: "DailyQuestion", component: DailyQuestionComponent, canActivate: [checkUserGuard,addDailyQuestionGuard] }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(questionRoute)
  ],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
