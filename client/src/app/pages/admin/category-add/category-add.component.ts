import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interface/Category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {


  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required]]
  })
  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder, private router: Router) {
    
  }

  onHandleSubmit() {
    const category: Category = {
      name: this.categoryForm.value.name || ""
    }

    this.categoryService.addCategory(category).subscribe(() => {
      alert('Added category successfully')
      this.router.navigate(['/admin/dashboard/category']);
    })
  }
}
