import { Component,Input,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef  } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  selector: 'app-dilog-gpt',
  templateUrl: './dilog-gpt.component.html',
  styleUrl: './dilog-gpt.component.css'
})
export class DilogGptComponent { 
  message1: string = '';
  imageUrl: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: OpenAIResponse,private router: Router ,private dialogRef: MatDialogRef<DilogGptComponent>)  {}
  ngOnInit(): void {
    console.log("ngOnInit called");
    const firstChoice = this.data.choices[0];
    const messageContent = firstChoice.message.content;
    this.message1 =messageContent;
    console.log( this.message1);
   
  }
  backHome():void{
    this.dialogRef.close();
    this.router.navigate(["/home"]);
  }
  
}
