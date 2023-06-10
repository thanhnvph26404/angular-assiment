import { Component } from '@angular/core';
import { Product } from 'src/app/interface/Product';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent {
  products!: any[]
  
  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this.productService.getProducts().subscribe(response => {
      this.products = response.data
      
      this.products.forEach(product => {
        this.categoryService.getCategory(product.categoryId).subscribe(response => {
          product.categoryName = response.data.category.name;
          
          
          
        });
      });
    })
  }

  onRemove(id: string | number) {
    if (confirm('Are you sure you want to remove this product')){
      this.productService.removeProduct(id).subscribe(() => {
        this.products = this.products.filter(product => product._id !== id)
        alert('product removed successfully')
      })
    }
  }
}
