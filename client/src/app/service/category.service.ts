import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interface/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:8080/api/categories`);
  }
  getCategory(id: number | string): Observable<Category> {
    return this.http.get<Category>(
      `http://localhost:8080/api/categories/${id}`
    );
  }
  // removeCategory(id: number | string): Observable<Category> {
  //   return this.http.delete<Category>(`http://localhost:8080/api/categories/${id}`);
  // }
  addCaregory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      `http://localhost:8080/api/categories`,
      category
    );
  }
  editCategory(category: Category): Observable<Category> {
    return this.http.patch<Category>(
      `http://localhost:8080/api/categories/${category._id}`,
      category
    );
  }
}
