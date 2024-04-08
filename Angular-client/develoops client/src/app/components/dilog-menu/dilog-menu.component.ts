import { Component,OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question.model';
@Component({
  selector: 'app-dilog-menu',
  standalone: true,
  imports: [CommonModule,FormsModule,MatCardModule, MatCheckboxModule, FormsModule, MatRadioModule],
  templateUrl: './dilog-menu.component.html',
  styleUrl: './dilog-menu.component.css'
})
export class DilogMenuComponent implements OnInit {
  public CategoryList!: Category[]
  public filterCategoryList!: Category[]
  public serch = ''
  public isCategory = true;
  public c!:Category;
  dailyQuestion!: Question;
  constructor(private router:Router,private _categoryService:CategoryService,private _questionService:QuestionService) { }
  ngOnInit(): void {
    this.dailyQuestion=this._questionService.getDailyQuestionfromService();
  
    // this._categoryService.getCategoryById(2).subscribe({
    //   next: (res) => {
    //   this.c=res
    //   console.log(res.questions)
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
    this.CategoryList=[];
    this._categoryService.getAllCategory().subscribe({
      next: (res) => {
        console.log(res);
        this.filterCategoryList = this.CategoryList = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  public filterCategory() {
    this.filterCategoryList = this.CategoryList.filter(category =>
      category.text.toLowerCase().includes(this.serch.toLowerCase())
    );
  
    this.isCategory = this.filterCategoryList.length > 0;
  }

  onCategorySelected(event: Category): void {
    // if (event && event.id !== undefined) {
    //   const selectedCategoryId = event.id;
    //   // Use the service to share the selected category
    //   this._categoryService.setSelectedCategory(event);
    //   // Navigate to the TargetComponent
    //   this.router.navigate(['/Questions']);  // Update 'target' to the actual route of TargetComponent
    // } else {
    //   console.error('Invalid or undefined event or category ID.');
    // }
    console.log(event)
    this.router.navigate(["/question/show-question",event.id,event.text]);
  }
}
export class CheckboxConfigurableExample {
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
}
