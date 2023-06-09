import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/Product';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  product!: Product

  constructor(private productService: ProductService, private router: ActivatedRoute) {
    this.router.paramMap.subscribe(params => {
      const id = params.get('id')
      this.productService.getProduct(id!).subscribe(response => {
        this.product = response.data
      }
      )
    })
  }
}
