import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
 
import { Category } from '../models/category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private selectedCategorySource = new BehaviorSubject<Category | null>(null);
  selectedCategory$ = this.selectedCategorySource.asObservable();
  public categoryList: Category[] = [
   
  ];

  constructor(private _httpClient: HttpClient) {  
  }


  setSelectedCategory(category: Category): void {
    this.selectedCategorySource.next(category);
  }

  getSelectedCategory(): Category | null {
    return this.selectedCategorySource.value;
  }
  getAllCategory(): Observable<Category[]> {
    return this._httpClient.get<Category[]>('https://localhost:7063/api/Category')
  }
  getCategoryById(id: number): Observable<Category> {
    return this._httpClient.get<Category>(`https://localhost:7063/api/Category/${id}`)
    
  }



}

