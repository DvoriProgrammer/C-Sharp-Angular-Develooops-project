import { Component, Renderer2, ElementRef, HostListener,AfterViewInit ,OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question.model';

import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  dailyQuestion!: Question;
  constructor(private _questionService:QuestionService,private router: Router){}
  questionItems = [
    { imgUrl: 'https://cdn.sstatic.net/Img/home/illo-feats-ask.svg?v=b6cd07f0765a' },
    { imgUrl: 'https://cdn.sstatic.net/Img/home/illo-feats-vote.svg?v=9d2eb0efdc17' },
    { imgUrl: 'https://cdn.sstatic.net/Img/home/illo-feats-answer.svg?v=b637b99bc32a' },
    { imgUrl: 'https://cdn.sstatic.net/Img/home/illo-feats-tags.svg?v=0655cbe6bffa' },
    { imgUrl: 'https://cdn.sstatic.net/Img/home/illo-feats-accept.svg?v=f2be4b8dfdac' },
    { imgUrl: 'https://cdn.sstatic.net/Img/home/illo-feats-recognize.svg?v=4f011d7173e8' }
  ];

  searchPlaceholder = 'Search...';
  searchInput: string = '';
  isSearchOpen: boolean = false;

 
  selectItem(index: number) {
    // Handle selection logic here
  }

  startSlider() {
    // Implement slider logic here
  }

  showHints() {
    // Implement showHints logic here
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (!this.isSearchOpen) {
      // Close the hints after a delay
      setTimeout(() => {
        this.isSearchOpen = false;
      }, 50);
    }
  }
  ngOnInit(): void {
    this._questionService.getDailyQuestion().subscribe((question) => {
     console.log(question); 
     this.dailyQuestion = <Question>question;
     this._questionService.setDailyQuestion(<Question>question);
     this.startSlider();
     });
  }
  moveCommonError(){
    this.router.navigate(["/CommonErrors"]);
  }
  moveAbout(){
    this.router.navigate(["/about"]);
  }
}
