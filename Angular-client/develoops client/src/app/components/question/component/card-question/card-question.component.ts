import { Component,OnInit,OnChanges, SimpleChanges ,ElementRef, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../../../models/question.model';
import { QuestionService } from '../../../../services/question.service';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Answer } from '../../../../models/answer.model';
import { AnswerService } from '../../../../services/answer.service';
 import { AnswerListComponent } from '../answer-list/answer-list.component';
 import { DomSanitizer } from '@angular/platform-browser';
 
 import Swal from 'sweetalert2'; // Import SweetAlert

 import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { SuccessComponent } from '../success/success.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { log } from 'console';

@Component({
  selector: 'app-card-question',
  templateUrl: './card-question.component.html',
  styleUrl: './card-question.component.css'
})
export class CardQuestionComponent {
  userEnteredValue: string = '';
  title = 'my-app';
  isGreen!:false;
  lines: string[] = [];
  currentQuestion!:Question;
  currentAnswer!:Answer;
  addAnswer: boolean = false;
  postAnswer!:Answer;
  code: string = '';
  @ViewChild('codeInput') codeInputRef!: ElementRef;
  @ViewChild('editor') editorElementRef!: ElementRef;
  @ViewChild('htmlTextArea') htmlTextAreaRef!: ElementRef;
  @ViewChild('cssTextArea') cssTextAreaRef!: ElementRef;
  @ViewChild('jsTextArea') jsTextAreaRef!: ElementRef;
  editor: any;
  userId!:number; 
  
output: string = '';
  constructor( private _questionService:QuestionService ,private _answerService:AnswerService,private router:Router,public dialog: MatDialog) { 
   //this.currentQuestion = this.route.snapshot.state.question;
  }
  // ngAfterViewInit(): void {
  //   this.initEditor();
  // }

  // initEditor() {
  //   if (this.editorElementRef.nativeElement) {
  //     this.editor = ace.edit(this.editorElementRef.nativeElement);
  //     this.editor.setTheme('ace/theme/chrome');
  //     this.editor.session.setMode('ace/mode/javascript');
  //   } else {
  //     console.error('Editor element not found');
  //   }
  // }
  ngOnInit():void {

    if (typeof localStorage !== 'undefined') {
      const u=localStorage.getItem("user");
      const user = u ? JSON.parse(u) : null;
      if(user!=null)
      this.userId=user.id;
       } 
 
      // Initialize Ace Editor
    
   
     this.currentQuestion = this._questionService.getSavedObject();
     console.log(this.currentQuestion); 
    }
    ngOnChanges(changes: SimpleChanges): void {
      // Check if the 'answersList' input has changed
      if ('answersList' in changes) {
        // Perform any necessary actions when 'answersList' changes
        console.log('answersList changed:', this.currentQuestion?.answers);
      }
    }
    
    toggleAddAnswer() { 
  this.addAnswer = !this.addAnswer;    
    }    
    addFunction() {  
      this.addAnswer = !this.addAnswer;
       console.log(this.userEnteredValue); 
       this.postAnswer = {
        date:new Date(),
        score: 0,
        userId:  this.userId,
        content: this.userEnteredValue,
        title: "nnn",
        questionId: this.currentQuestion.id?this.currentQuestion.id:0,
      };
      console.log(this.postAnswer);
     this._answerService.postAnswer(this.postAnswer).subscribe({
      next: (res) => {
        console.log("😍");
        this._questionService.push(this.postAnswer);
      // const dialogRef = this.dialog.open(SuccessComponent, {
      //   width:'60%',
      //     position: { top: '7%', left: '20%' },
      //      });
      //    dialogRef.afterClosed().subscribe(result => {
      //      console.log('The dialog was closed');   
      //    });

      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
      },
      error: (err) => {
      }
    })
    }
  
    
  
    runCode() {
    
    }

    
      }
      
       

