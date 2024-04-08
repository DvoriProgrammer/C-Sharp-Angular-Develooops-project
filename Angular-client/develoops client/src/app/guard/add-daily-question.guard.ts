import { CanActivateFn } from '@angular/router';

import { UserDto } from '../models/userDto.model';
import Swal from 'sweetalert2'; // Import SweetAlert
export const addDailyQuestionGuard: CanActivateFn = (route, state) => {
  if (typeof localStorage !== 'undefined') {
    const u=localStorage.getItem("user");
    const user = u ? JSON.parse(u) : null;
    console.log("jhg")
   if(user.role==="admin")
   return true;
  else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "only admin can add question!",
      // footer: '<a href="#">Why do I have this issue?</a>'
    });
return false;
  }
     } 
     return false;
 

};
