import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  MatDialog,
} from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { DilogMenuComponent } from '../dilog-menu/dilog-menu.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [DilogMenuComponent, MatToolbarModule, MatIconModule, MatButtonModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(public dialog: MatDialog, private router: Router) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(DilogMenuComponent, {
      width: '250px',
      position: { top: '4%', left: '0' },
    });
    dialogRef.afterOpened().subscribe(() => {
      const contentElement = document.getElementById('content'); // השימוש באיידי של אלמנט התוכן
      if (contentElement) {
          contentElement.

scrollIntoView({ behavior: 'smooth', block: 'start' }); // גלילה לתוכן
      }
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
    });
  }
  moveSignUp() {
    this.router.navigate(['/auth/SignUp']);
  }
  moveSignIn() {
    this.router.navigate(['/auth/SignIn']);
  }

  getUserImageFromSessionStorage():string{

    if (typeof localStorage !== 'undefined') {
      const currentTimestamp = Math.floor(Date.now() / 1000); // זמן נוכחי בפורמט Unix (בשניות)
  const exp = parseInt(localStorage.getItem('exp') || '0', 10); // קבלת ערך ה-exp מ-local storage
  if( exp > currentTimestamp) {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    return (user && user.img);
  }
}
      return  "https://lh3.googleusercontent.com/-JM2xsdjz2Bw/AAAAAAAAAAI/AAAAAAAAAAA/DVECr-jVlk4/photo.jpg";
  }    
  moveMyAccount():void{
    this.router.navigate(['/myAccount']);
  }
  goHome(){
    this.router.navigate(['/home']);
  }
}



// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
//   standalone: true,
//   imports: [
//     MatFormFieldModule,
//     MatInputModule,
//     FormsModule,
//     MatButtonModule,
//     MatDialogTitle,
//     MatDialogContent,
//     MatDialogActions,
//     MatDialogClose,
//   ],
// })
// export class DialogOverviewExampleDialog {
//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData,
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
