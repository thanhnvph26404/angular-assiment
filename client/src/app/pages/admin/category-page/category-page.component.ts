import { Component } from '@angular/core';
import { Category } from 'src/app/interface/Category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent {
  categories!: Category[]
  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe(data => this.categories = data
    )
    
  }
  
  
  onRemove(id: number | string) {
    this.categoryService.removeCategory(id!)
  }

}
