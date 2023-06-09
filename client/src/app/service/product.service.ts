import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interface/Category';
import { Observable } from 'rxjs';
import { Product } from '../interface/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/products`);
  }
  getProduct(_id: number | string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/api/products/${_id}`
    );
  }
  removeProduct(_id: number | string): Observable<Product> {
    return this.http.delete<Product>(`http://localhost:8080/api/products/${_id}`);
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `http://localhost:8080/api/products`,
      product
    );
  }
  editProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(
      `http://localhost:8080/api/products/${product._id}`,
      product
    );
  }
}
