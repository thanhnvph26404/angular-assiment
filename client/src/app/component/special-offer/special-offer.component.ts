import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-special-offer',
  templateUrl: './special-offer.component.html',
  styleUrls: ['./special-offer.component.scss'],
})
export class SpecialOfferComponent {
  products!: any[]

  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe(response => {
      this.products = response.data.slice(0, 3)
    });
  };

}

