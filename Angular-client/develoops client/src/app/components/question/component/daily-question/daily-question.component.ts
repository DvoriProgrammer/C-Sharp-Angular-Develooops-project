import { Component } from '@angular/core';
import { Question } from '../../../../models/question.model';
import { Answer } from '../../../../models/answer.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { QuestionService } from '../../../../services/question.service';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from '../../../../services/answer.service';
import { log } from 'console';
import Swal from 'sweetalert2'; // Import SweetAlert
@Component({
  selector: 'app-daily-question',
  templateUrl: './daily-question.component.html',
  styleUrl: './daily-question.component.css',
 
})
export class DailyQuestionComponent {
  AddRequrstForm!: FormGroup;
  userId!:number;
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  selectedImage!: File;
  userQuestion: string = '';
  answer: string = '';
  postAnswer!:Answer; 
  userEnteredValue: string = '';
  idQuestion!:number;

 questionSend!:boolean;
 
  constructor( private _questionService:QuestionService, private _userService: UserService, private route: ActivatedRoute,private _answerService:AnswerService,private _formBuilder: FormBuilder) { }
  ngOnInit(): void {
    
    this.questionSend=false;
    if (typeof localStorage !== 'undefined') {
      const u=localStorage.getItem("user");
      const user = u ? JSON.parse(u) : null;
      this.userId=user.id;
       } 
    const currentDate = new Date();
const formattedDate = currentDate.toISOString();
    this.AddRequrstForm = new FormGroup({
      "Title": new FormControl(""),
      "Content": new FormControl(""),
      "FileImage": new FormControl('https://secure.gravatar.com/avatar/0df743e0a36602262cfc20474f3adfbe?s=150&d=mm&r=g'),
      "CategoryId": new FormControl(2),
      "UserId": new FormControl(this.userId),
      "Date": new FormControl(formattedDate),
      "User": new FormControl(this.userId)
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.selectedImage = event.target.files[0];
  } 
  AddQuestion(): void {
    let question = this.AddRequrstForm.value;
    this.userQuestion=this.AddRequrstForm.value.Content;
    console.log(this.userQuestion);
    console.log(question);
    //console.log(this.question.Content);
    const formData = new FormData();
    formData.append("FileImage", this.selectedImage);
    formData.append('Title', question.Title);
    formData.append('Content', question.Content);
    formData.append('UserId',question.User );
    formData.append('CategoryId', question.CategoryId);
    formData.append('Date',question.Date);
    this._questionService.postQuestion(formData).subscribe({
      next: (res)=>{
        this.questionSend=true;
      var x=<unknown>res;
        this.idQuestion=<number>x;
        console.log(this.idQuestion);
        console.log(typeof(this.idQuestion));
      },
      error: (err) => {
      }
    })
  }
  addAnswer() {  
     console.log(this.userEnteredValue); 
     this.postAnswer = {
      date:new Date(),
      score: 0,
      userId: this.userId,
      content: this.userEnteredValue,
      title: "nnn",
      questionId: this.idQuestion?this.idQuestion:0,
    };
    console.log(this.postAnswer);
   this._answerService.postAnswer(this.postAnswer).subscribe({
    next: (res) => {
      console.log("😍");
      console.log("okjhghf");
      Swal.fire({
        title: "Answer",
        text: "You clicked the button!",
        icon: "success"
      });

    },
    error: (err) => {
    }
  })
  }
}
