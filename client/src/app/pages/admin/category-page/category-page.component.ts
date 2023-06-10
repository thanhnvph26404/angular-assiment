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
    if (confirm('Are you sure you want to remove')){
    this.categoryService.removeCategory(id!).subscribe(() => {
      this.categories = this.categories.filter(category => category._id !== id)
      alert('category deleted successfully')
    } )
        
      }
      
  }

}
