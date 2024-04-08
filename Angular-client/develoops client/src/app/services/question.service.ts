import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
import { environment } from '../../environments/environment';
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
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  apiKey: string;
  openAIEndpoint:string;
  private savedObject!: Question;
  private dailyQuestion!: Question;

  
 
  constructor(private _httpClient: HttpClient, private http: HttpClient) {
    this.apiKey = environment.apiKey;
    this.openAIEndpoint = environment.apiUrl;
   }
  saveObject(obj: Question): Promise<void> {
    return new Promise<void>((resolve) => {
      this.savedObject = obj;
      resolve();
    });
  }

  getDailyQuestionfromService(): Question {
    return this.dailyQuestion;
  }

  setDailyQuestion(obj: Question): Promise<void> {
    return new Promise<void>((resolve) => {
      this.dailyQuestion = obj;
      resolve();
    });
  }

  getSavedObject(): Question {
    return this.savedObject;
  }
  getQuestionById(id: number): Observable<Question> {
    return this._httpClient.get<Question>(`https://localhost:7063/api/Question/byCategory/${id}`)
  }
  addQuestion(student: Question) {
    // this.studentList.push(student)
  }
  getAllQuestion(): Observable<Question[]> {
    return this._httpClient.get<Question[]>('https://localhost:7063/api/Question')
  }
  getQuestionByUserId(): Observable<Question[]> {
    return this._httpClient.get<Question[]>('https://localhost:7063/api/Question/byUserId/${id}')
  }
  getQuestionByCategoryId(id: number): Observable<Question[]> {
    return this._httpClient.get<Question[]>(`https://localhost:7063/api/Question/byCategoryId/${id}`)

  }
  postQuestion(formData: FormData) {
    return this._httpClient.post<Response>('https://localhost:7063/api/Question', formData);
  }
  delete(id:number|null){
    return this._httpClient.delete<Response>(`https://localhost:7063/api/Question/${id}`)
  }
  push(answer: Answer) {
    this.savedObject.answers.push(answer);
  }


  askQuestion(userQuestion: string): Observable<OpenAIResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const data = {
      model: 'gpt-3.5-turbo',

      messages: [
        { 'role': 'system', 'content': 'You are a helpful assistant.' },
        { 'role': 'user', 'content': userQuestion }
      ],
    };
    return this.http.post<OpenAIResponse>(this.openAIEndpoint, data, { headers });
  }


  getDailyQuestion(): Observable<Object> {
    const admin = "admin";
    return this._httpClient.get<Question>(`https://localhost:7063/api/Question/deilyQuestion/${"bvv"}`)

  }
}
