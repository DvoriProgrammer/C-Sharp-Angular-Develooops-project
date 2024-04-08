import { CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
export const checkUserGuard: CanActivateFn = (route, state) => {

  if (typeof localStorage !== 'undefined') {
    if(!localStorage.getItem('token')){
      Swal.fire({
        title: "You are not logged in",
        text: "In order to ask a question,\nyou need to be logged in", // Add \n for newline
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showCancelButton: true, // Show the Cancel button
        confirmButtonText: "SignIn",
        cancelButtonText: "SignUp",
        showCloseButton: true, // Show the close button (X)
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/auth/SignIn';
          console.log(result.isConfirmed);
         
          // Navigate to SignIn component
          // Router.navigate(['/auth/SignIn']);
        } else if (result.dismiss === Swal.DismissReason.cancel) { // Handle SignUp button click
          console.log(result.dismiss);
          window.location.href = '/auth/SignUp';
          // Navigate to SignUp component
          // Router.navigate(['/auth/SignUp']);
        }
      } 
      )
      ;
      return false; // If the user doesn
    }
    let expiration=localStorage.getItem('exp');
console.log(expiration)
if (expiration) {
  //   let dateTime: Date = new Date(dateString);
  //    let currentDate: Date = new Date();
  //    let differenceInMinutes: number = Math.abs((dateTime.getTime() - currentDate.getTime()) / (1000 * 60));
  //  let expiration=  localStorage.getItem('expiration');
    //  if (differenceInMinutes < Number(expiration)) {
      const currentTimestamp = Math.floor(Date.now() / 1000); // זמן נוכחי בפורמט Unix (בשניות)
      const exp = parseInt(localStorage.getItem('exp') || '0', 10); // קבלת ערך ה-exp מ-local storage
      console.log(currentTimestamp);
      console.log(exp);
        // אם exp גדול מזמן הנוכחי, הטוקן עדיין תקף
   if( exp > currentTimestamp){return true}
                Swal.fire({
      title: "You are not logged in",
      text: "In order to ask a question,\nyou need to be logged in", // Add \n for newline
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showCancelButton: true, // Show the Cancel button
      confirmButtonText: "SignIn",
      cancelButtonText: "SignUp",
      showCloseButton: true, // Show the close button (X)
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.isConfirmed);

        // Navigate to SignIn component
        // Router.navigate(['/auth/SignIn']);
      } else if (result.dismiss === Swal.DismissReason.cancel) { // Handle SignUp button click
        console.log(result.dismiss);
        // Navigate to SignUp component
        // Router.navigate(['/auth/SignUp']);
      }
    }
    
    
    
    )
    ;


    
    return false; // If the user doesn't exist, prevent navigation
 
}
   


// החלק השני מהבדיקה: הבדל בין התאריך מהשרת לתאריך הנוכחי בדקות
    let user = localStorage.getItem("user");
    if (user) {
      return true; // If the user exists, allow navigation
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "In order to ask a question,\nyou need to be logged in", // Add \n for newline
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showCancelButton: true, // Show the Cancel button
        confirmButtonText: "SignIn",
        cancelButtonText: "SignUp",
        showCloseButton: true, // Show the close button (X)
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to SignIn component
          // Router.navigate(['/auth/SignIn']);
        } else if (result.dismiss === Swal.DismissReason.cancel) { // Handle SignUp button click
          // Navigate to SignUp component
          // Router.navigate(['/auth/SignUp']);
        }
      });
      return false; // If the user doesn't exist, prevent navigation
    }
  } else {
    console.error("sessionStorage is not available.");
    return false; // Prevent navigation if sessionStorage is not available
  }
};