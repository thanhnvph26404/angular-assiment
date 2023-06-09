import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interface/Category';
import { Observable } from 'rxjs';
import { Product } from '../interface/Product';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:8080/api/categories`);
  }
  getProductOfCategory(_id: number | string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/api/categories/${_id}`
    );
  }
  getCategory(_id: number | string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/api/categories/${_id}?_embed=true`
    );
  }
  removeCategory(_id: number | string): Observable<Category> {
    return this.http.delete<Category>(`http://localhost:8080/api/categories/${_id}`);
  }
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
