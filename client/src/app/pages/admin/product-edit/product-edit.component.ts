import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/interface/Product';  
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/interface/Category';
import { Router , ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  categories!: Category[]
  product!: any
  img!: any
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private navigate: Router,
    private router: ActivatedRoute
  ) {
    this.router.paramMap.subscribe(params => {
      const id = params.get('id')
      this.productService.getProduct(id!).subscribe(result => {
        this.product = result.data
        this.productForm.patchValue({
          name: result.data.name,
          image: result.data.image,
          price: result.data.price,
          flavor: result.data.flavor,
          description: result.data.description,
          categoryId: result.data.categoryId,
        })
        
      }
      )
    })
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => this.categories = data)
   }
  productForm = this.formBuilder.group({
    name: [''],
    image: [''],
    price: [0],
    flavor: [''],
    description: [''],
    categoryId: [''],
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
    const product: Product = {
      _id: this.product._id,
    name: this.productForm.value.name || '',
    image: this.img || undefined,
    price: this.productForm.value.price || 0,
    flavor: this.productForm.value.flavor || '',
    description: this.productForm.value.description || '',
    categoryId: this.productForm.value.categoryId || '',
    }
    
    
    
    
    
    this.productService.editProduct(product).subscribe(() => {
      alert('Product updated successfully')
      this.navigate.navigate(['/admin/dashboard/product'])
    })
  }
}
