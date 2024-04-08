import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowQuestionComponent } from './component/show-question/show-question.component';
import { CardQuestionComponent } from './component/card-question/card-question.component';
import { QuestionRoutingModule } from './question.routing.module';
import { AddQuestionComponent } from './component/add-question/add-question.component';
import { AnswerListComponent } from './component/answer-list/answer-list.component';
import { SuccessComponent } from './component/success/success.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DilogGptComponent } from './component/dilog-gpt/dilog-gpt.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { DailyQuestionComponent } from './component/daily-question/daily-question.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import {FormBuilder, Validators} from '@angular/forms';
import { DateFromDateTimePipe } from '../../date-from-date-time.pipe';

@NgModule({
    declarations: [SuccessComponent, AnswerListComponent, AddQuestionComponent, CardQuestionComponent, ShowQuestionComponent, DilogGptComponent, DailyQuestionComponent],
    imports: [
        CommonModule, MatCardModule, MatButtonModule, MatIconModule, FormsModule, QuestionRoutingModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    
})
export class QuestionModule { }