import { Component , OnInit } from '@angular/core';
import { Category } from 'src/app/interface/Category';
import { Product } from 'src/app/interface/Product';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent {
  selectedIndex: number = 0;
  firstId!: string | number
  
  categories!: Category[]
  products!: Product[]

  constructor(private categorySevives: CategoryService) {
    
  }
  ngOnInit(): void {
    this.categorySevives.getCategories().subscribe(data => {
      this.categories = data
      this.firstId = this.categories[0]._id!
      console.log(this.firstId);
      
      this.getProductsByCategory(this.firstId)
    })
    
  }

  
  getProductsByCategory(id: string | number) {
    this.categorySevives.getProductOfCategory(id).subscribe(({data}) => {
      this.products = data
      console.log(this.products);
      
    })
    
    
  }
  selectCategory(index: number, id: number | string){
    this.selectedIndex = index;
    this.getProductsByCategory(id)
    
  }
}
