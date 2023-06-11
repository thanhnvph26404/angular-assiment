import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/interface/Product';  
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/interface/Category';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  categories!: Category[]
  img!: any
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryService.getCategories().subscribe(data => this.categories = data
    )
  }

  productForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    price: [0, [Validators.required]],
    flavor: ['', [Validators.required]],
    description: ['', [Validators.required]],
    categoryId: ['',[Validators.required]],
  })

  handleImageUpload(event: any) {
    
    const file = event.target.files[0];
    
    const reader = new FileReader();
        reader.readAsDataURL(file);
    reader.onloadend = () => {
          this.img = reader.result
          
        }
    
    
  }

  onSubmit() {
    const product:Product = {
    name: this.productForm.value.name || '',
    image: this.img || undefined,
    price: this.productForm.value.price || 0,
    flavor: this.productForm.value.flavor || '',
    description: this.productForm.value.description || '',
    categoryId: this.productForm.value.categoryId || '',
    }
    
    
    
    
    
    this.productService.addProduct(product).subscribe((product) => {
      alert('Product added successfully')
      this.router.navigate(['/admin/dashboard/product'])
    })
  }
}
