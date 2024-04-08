import { Component } from '@angular/core';
import { Question } from '../../../../models/question.model';
import { QuestionService } from '../../../../services/question.service';
import { CardQuestionComponent } from '../card-question/card-question.component';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import Swal from 'sweetalert2'; // Import SweetAlert
@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrl: './show-question.component.css'
})
export class ShowQuestionComponent {
  disableSelect = { value: false };
  private categoryId!: number
  selectedCategory: Category | undefined;
  public questionList!: Question[]
  categoryName!: string;
  dailyQuestion!: Question;
  showAnswer!: boolean;
  MyAccount!:boolean|null;
  searchSubjectText!: string;
 basicquestionList!: Question[]
  searchSubjectResults: Question[] = [];
  currentUser!:any;
  
  constructor(private _questionService: QuestionService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    
    this.showAnswer = false;
    this.dailyQuestion = this._questionService.getDailyQuestionfromService();

   
  
    this.route.params.subscribe((parm) => {
      this.categoryId = parm['id'];
      this.categoryName = parm['text'];
      console.log(this.categoryId)
      this._questionService.getQuestionByCategoryId(this.categoryId).subscribe({
        next: (res) => {
          this.questionList = res
          console.log(this.questionList);
          this.basicquestionList=this.questionList;
          console.log(this.questionList[0]);
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }
ceekRole(){
  if (typeof localStorage !== 'undefined') {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
  if(user!=null&&user.role==='admin')
  return true;}
return false;
}
  goReadMore(question: Question): void {
    console.log("cdkkc");
    this._questionService.saveObject(question)//save in service!
    this.router.navigate(['/question/card-question', question.id]);
  }
// environment
  moveAddQuestion() {
    console.log("add");
    // this.router.navigate(["/question/show-question",event.id,event.text]);
    this.router.navigate(['/question/add-question', this.categoryId]);

  }


  show(): void {
    this.showAnswer = true;
  }
  delete(question:Question){
this._questionService.delete(question.id?question.id:null).subscribe({
  next: (res) => {
    console.log("yiyiy")
  },error:(err)=>{
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }
})
  }
  sortByNewest() {
    this.questionList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  sortByOldest() {
    this.questionList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  newDailyQuestion() {
    this.router.navigate(['/question/DailyQuestion']);
  }
  onSearchInputChange() {
    if (this.searchSubjectText) {
      // סריקת הרשימה לחיפוש הנושאים שמתאימים לטקסט המוזן
      this.searchSubjectResults = this.questionList.filter(questionList => questionList.title.toLowerCase().includes(this.searchSubjectText.toLowerCase())|| questionList.content.toLowerCase().includes(this.searchSubjectText.toLowerCase()));
      console.log(this.searchSubjectResults);
      this.questionList=this.searchSubjectResults;
    } else {
      // אם לא מוזן טקסט, נסיר את כל התוצאות הקיימות
      this.searchSubjectResults = [];
    }
  }
}

