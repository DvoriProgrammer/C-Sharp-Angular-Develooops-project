import { Component, Input,OnChanges,SimpleChanges } from '@angular/core';
import { Answer } from '../../../../models/answer.model';
import { log } from 'console';
import { AnswerService } from '../../../../services/answer.service';
@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrl: './answer-list.component.css'
})
export class AnswerListComponent {
@Input()
answersList?:Answer[];
previousAnswersList: Answer[] | undefined;
userData: any;
id:number=0;
userId:number=0;
constructor(private _answerService:AnswerService) { }
ngOnInit(): void {

  if (typeof localStorage !== 'undefined') {
    const u=localStorage.getItem("user");
    const user = u ? JSON.parse(u) : null;
    if(u!=null)
    this.userId=user.id;
     } 

  console.log("mnbhvgcfxd");
  // Retrieve user data from local storage
  // const userDataString = sessionStorage.getItem('user');
  // console.log(userDataString);
  
  // if (userDataString) {
  //   this.userData = JSON.parse(userDataString);
  //   console.log(this.userData);
  // }
}
getUserImageFromSessionStorage(): string {
  if (typeof localStorage !== 'undefined') {
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      return (user && user.img) ? user.img : "https://lh3.googleusercontent.com/-JM2xsdjz2Bw/AAAAAAAAAAI/AAAAAAAAAAA/DVECr-jVlk4/photo.jpg";
  } else {
      return "https://lh3.googleusercontent.com/-JM2xsdjz2Bw/AAAAAAAAAAI/AAAAAAAAAAA/DVECr-jVlk4/photo.jpg";
  }
}
ngOnChanges(changes: SimpleChanges): void {
  if ('answersList' in changes) {
    const currentValue = changes['answersList'].currentValue; // שימוש בסוגריים מרובעות
    if (this.previousAnswersList && JSON.stringify(this.previousAnswersList) !== JSON.stringify(currentValue)) {
      console.log('The answers list has changed.');
      // עשו כאן מה שאתם רוצים לעשות כאשר המערך משתנה
    }
    this.previousAnswersList = currentValue;
  }
}
replaceNewlinesWithBr(content: string): string {
  return content.replace(/\n/g, '<br>');
}

addScore(answerId:number,answer:Answer):void{
  answer.score++;
  if (typeof localStorage !== 'undefined') {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
     this.id=user.id;
  }
  console.log(this.id);
  this._answerService.addScore(answerId,  this.id).subscribe({
    next: (res)=>{
      console.log(res);
      //  this.signUp(s);
    },
    error: (err) => {
      console.log(err)
    }// ! this.isExist; console.log(err); console.log("bad"); } }) }
    // this._studentService.addStudent(student)
    // this.onAddStudent.emit(student);
  })
}
}
