import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { QuestionService } from '../../../../services/question.service';
import { UserService } from '../../../../services/user.service';
import { Question } from '../../../../models/question.model';
import { MatDialog } from '@angular/material/dialog';
import { DilogGptComponent } from '../dilog-gpt/dilog-gpt.component';
import { AnswerService } from '../../../../services/answer.service';
import { Answer } from '../../../../models/answer.model';
interface OpenAIResponse {
  
  choices: {
    text: string;
    confidence: number;
    message: {
      content: string;
      role: string;
    };
  }[];
  // Include other relevant fields if needed
  error?: {
    message: string;
    type: string;
    code: string;
  };
}
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {
  userId!:number;
  AddRequrstForm!: FormGroup;
  selectedImage!: File;
  userQuestion: string = '';
  answer: string = '';
  loading: boolean = false;
  categoryId!:number;
  postAnswer!:Answer;
  constructor(private router: Router, private _questionService: QuestionService, private _userService: UserService,private dialog: MatDialog, private route: ActivatedRoute,private _answerService:AnswerService) { }
  onCategorySelected(event: Number): void {

    this.router.navigate(["/question/show-question"]);
  }

  ngOnInit(): void {

    if (typeof localStorage !== 'undefined') {
      const u=localStorage.getItem("user");
      const user = u ? JSON.parse(u) : null;
      this.userId=user.id;
       } 
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
    });
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    this.AddRequrstForm = new FormGroup({
      "Title": new FormControl(""),
      "Content": new FormControl(""),
      "FileImage": new FormControl('https://secure.gravatar.com/avatar/0df743e0a36602262cfc20474f3adfbe?s=150&d=mm&r=g'),
      "CategoryId": new FormControl(this.categoryId ),
      "UserId": new FormControl(this.userId),
      "Date": new FormControl(formattedDate),
      "User": new FormControl(this.userId)
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.selectedImage = event.target.files[0];
  }
   submitQuestion(userQuestion:string,questionId:number) {
    this.loading = true;
    this._questionService.askQuestion(userQuestion).subscribe(response => {
      console.log(response);

  // Check if choices array is present and not empty
  if (response.choices && response.choices.length > 0) {
    // Access the first choice and its message property
    const firstChoice = response.choices[0];
    const messageContent = firstChoice.message.content;

    if (messageContent) {
      console.log(messageContent);


      this.openDialogWithData(response)
      console.log(messageContent); 
      this.postAnswer = {
       date:new Date(),
       score: 0,
       userId: 3,
       content:messageContent,
       title: "nnn",
       questionId:questionId?questionId:0,
     };
     console.log(this.postAnswer);
    this._answerService.postAnswer(this.postAnswer).subscribe({
     next: (res) => {
       console.log("😍");
     
     },
     error: (err) => {
     }
   })

    } else {
      console.log('No message content provided.');
    }
  } else {
    console.log('No choices provided in the response.');
  }
  this.loading = false;
    });
    }
  AddQuestion(): void {
    let question = this.AddRequrstForm.value;
    console.log(question.UserId)
    this.userQuestion=this.AddRequrstForm.value.Content;
    console.log(this.userQuestion);
  
    console.log(question);
    //console.log(this.question.Content);
    const formData = new FormData();
    formData.append("FileImage", this.selectedImage);
    formData.append('Title', question.Title);
    formData.append('Content', question.Content);
    formData.append('UserId', question.UserId);
    formData.append('CategoryId', question.CategoryId);
    formData.append('Date',question.Date);
    console.log(formData);
    this._questionService.postQuestion(formData).subscribe({
      next: (res)=>{
        console.log(res);
        this.submitQuestion(this.userQuestion,Number(res)); 
        //  this.signUp(s);
      },
      error: (err) => {
      }// ! this.isExist; console.log(err); console.log("bad"); } }) }
      // this._studentService.addStudent(student)
      // this.onAddStudent.emit(student);
    })
  }

  openDialogWithData(message:OpenAIResponse): void {
   
    const data = message;
      
  
    const dialogRef = this.dialog.open(DilogGptComponent, {
      width:'65%',
      data: data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed:', result);
    });
  }
  
}
