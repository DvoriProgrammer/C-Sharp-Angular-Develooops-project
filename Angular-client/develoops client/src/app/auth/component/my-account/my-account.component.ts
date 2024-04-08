

import { Component, ViewChild,AfterViewInit,ElementRef, } from "@angular/core";
import { QuestionService } from "../../../services/question.service";
import { UserService } from "../../../services/user.service";

interface UserActivityData {
  [month: string]: { [day: number]: number }; // Month as string (key) and day data as object
}
interface Image {
  id: string;
  imageUrl: string;
  width: number;
  height: number;
  tags: string[];
}
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import { FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {
  searchText = new FormControl('');
  amount = 5;
  type = 'all';
  images: any[] = [];
  userId: number = 1; // Assuming userId is 1, change it accordingly
  userActivity: any;
  matrixData: { level: number }[][] = [];
  userName!:"string";
   data!: UserActivityData;
   activities: Array<{
    month: string,
    day: number,
    percentage: number
  }> = [];
  columnIndex: number = 1;
  dayIndex: number = 0;
  indexj:number=1;
  constructor( private _questionService:QuestionService,private userService:UserService,private http: HttpClient){
   
  }
  onTextChange(): void {
    const val = this.searchText.value;
    if (val === '') {
      this.images = [];
    } else if(val !== null){
      this.userService.getImages(val)
        .subscribe(
          data => {
            this.images = data.hits;
            console.log(this.images)
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  onAmountChange(event: any): void {
    this.amount = event.target.value;
  }

  onTypeChange(event: any): void {
    this.type = event.target.value;
  } 
  ngOnInit(){
    // this.userService.getUserActivity(this.userId) .subscribe(data => {
    // this.userActivity=data;
    // console.log(data)
    // });
    // this.generateMatrixData();
    if (typeof localStorage !== 'undefined') {
    const u=localStorage.getItem("user");
    const user = u ? JSON.parse(u) : null;
    this.userId=user.id;
    this.userName=user.username;
     }
    this. getUserActivity();

  }
  getUserActivity(): void {

   this.userService.getUserActivity(this.userId) .subscribe(data => {
      for (const [month, days] of Object.entries(data as UserActivityData)) { 
        // Type assertion (if unsure of exact structure)
        for (const [day, value] of Object.entries(days)) {
          console.log(month);
          this.activities.push({
            month:month, // Convert month to number (if needed)
            day: +day,
            percentage: value // Assuming value is a number representing percentage
          });
        }
      }
    });
  }
   getDayClass(day: number): string | null {
  
    switch (day) {
      case 1:
        return 'sunday';
      case 2:
        return 'monday';
      case 3:
        return 'tuesday';
      case 4:
        return 'wednesday';
      case 5:
        return 'thursday';
      case 6:
        return 'friday';
      case 7:
        return 'saturday';
        default:
          return null; // או ערך אחר המייצג שאין CLASS כלשהו
    }
  }
  
  getPercentageStyle(percentage: number): { [key: string]: string } {
    if (percentage==0) {
      return { 'background-color': '#ACBAAF' };
    } else if (percentage <3) {
      return { 'background-color': '#9FF99F' };
    } else {
      return { 'background-color': '#0e3303' };
    }
  }
  // getUserActivity(): void {
  //   this.userService.getUserActivity(this.userId)
  //     .subscribe(activity => {
  //       console.log(activity);
  //       this.userActivity = activity;
      
  //     });
  // }
 
  
  getUserImageFromSessionStorage(): string {
    if (typeof localStorage !== 'undefined') {
    var userString:string|null = localStorage.getItem('user');
    const user = JSON.parse(userString || 'null');
    return (user && user.img )? user.img : "https://lh3.googleusercontent.com/-JM2xsdjz2Bw/AAAAAAAAAAI/AAAAAAAAAAA/DVECr-jVlk4/photo.jpg";}
    else
    return "https://lh3.googleusercontent.com/-JM2xsdjz2Bw/AAAAAAAAAAI/AAAAAAAAAAA/DVECr-jVlk4/photo.jpg";
  }
//   getColor(activityCount: number): string {
//     if (activityCount >= 5) {
//       return 'darkgreen'; // ירוק כהה
//     } 
   
// else if (activityCount >= 2) {
//       return 'limegreen'; // ירוק תפוח
//     } else {
//       return 'lightgreen'; // ירוק בהיר
//     }
//   }
trackByIndex(index: number, item: any): number {
  return index;
}

}
