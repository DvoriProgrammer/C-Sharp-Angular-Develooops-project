import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Answer } from '../models/answer.model';
@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private _httpClient: HttpClient) { }
  postAnswer(answer:Answer): Observable<void> {
    return this._httpClient.post<void>("https://localhost:7063/api/Answer", answer);
  }
  addScore(AnswerId:Number,UserId:Number):Observable<any>{
   const userR= {
      "answerId":AnswerId,
      "userId": UserId
    }
    return this._httpClient.post<any>("https://localhost:7063/api/UserRatings",userR)
  }
}

