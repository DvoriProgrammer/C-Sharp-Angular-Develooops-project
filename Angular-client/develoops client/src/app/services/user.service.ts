import { Injectable } from '@angular/core';
import { UserDto } from '../models/userDto.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http'
import { json } from 'stream/consumers';
import { CanActivateFn } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser!: UserDto;

  constructor(private _httpClient: HttpClient) { }

 
    public setCurrentUser(token: string): void {
      sessionStorage.setItem("token", token);
    }
  public  getImages(val:string): Observable<any> {
    
    const targetUrl = `https://pixabay.com/api/?key=32223807-65f70c9d54dcb844f54aca101&q=${val}&image_type=all&per_page=12&safesearch=true`;

     
      return this._httpClient.get<any>(targetUrl);
    }

  public getCurrentUser(): UserDto | null {
    return this.currentUser;
  }

  cheekbyUsername(username: string): Observable<string> {
    return this._httpClient.get<string>(`https://localhost:7063/api/User/byUsername/${username}`)
  }

  postUser(formData: FormData): Observable<any> {
    return this._httpClient.post<any>('https://localhost:7063/api/User', formData);
    
  }
  login(userName: string, password: string): Observable<any> {
    return this._httpClient.post("https://localhost:7063/api/User/login", { userName, password }, { responseType: 'text' });
  }
  getUserActivity(userId: number): Observable<any> {
    return this._httpClient.get<any>(`https://localhost:7063/api/User/${userId}/activity`);
  }
  sendEmail(email: string,subject: string,
  body: string) {
    const send={
      "recipientEmail":email,
      "subject": subject,
 "body": body
    }
    return this._httpClient.post<any>('https://localhost:7063/api/Email/sendEmail', send);
  }
  getUserByMail(email:string){
    return this._httpClient.get<any>(`https://localhost:7063/api/User/Getemail/${email}`);
  }
  }
  // login()

