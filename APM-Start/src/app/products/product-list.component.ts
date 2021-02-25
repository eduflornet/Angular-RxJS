import { catchError } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subscription, EMPTY } from 'rxjs';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$ = this.productService.products$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  sub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

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
