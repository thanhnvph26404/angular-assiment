import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interface/Category';
import { CategoryService } from 'src/app/service/category.service';
@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent {
  category!: Category
  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required]]
  })

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private navigate: Router
  ) {
    this.router.paramMap.subscribe(params => {
      const id = params.get('id')
      this.categoryService.getCategory(id!).subscribe(result => {
        this.category = result.data.category
        
        this.categoryForm.patchValue({
          name: result.data.category.name
        })
      })
    })
  }


  onHandleSubmit() {
    if (this.categoryForm.valid) { 
      const cate: Category = {
        _id: this.category._id,
        name: this.categoryForm.value.name || ""
      }
 
  
      this.categoryService.editCategory(cate).subscribe(() => {
        alert('Edited category successfully')
        this.navigate.navigate(['/admin/dashboard/category']);
      })
    }
    }
}
