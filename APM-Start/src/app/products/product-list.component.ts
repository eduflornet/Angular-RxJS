import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$: Observable<Product[]>;
  sub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.products$ = this.productService.getProducts();

    // this.sub = this.productService.getProducts()
    //   .subscribe(
    //     products => this.products = products,
    //     error => this.errorMessage = error
    //   );
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
