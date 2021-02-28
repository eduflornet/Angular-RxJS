import { ProductCategoryService } from "./../product-categories/product-category.service";
import { catchError, map, startWith } from "rxjs/operators";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  Subscription,
  EMPTY,
  Subject,
  BehaviorSubject,
  combineLatest,
} from "rxjs";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = "Product List";
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  errorMessage = "";
  categories;
  //selectedCategoryId;

  // Action stream
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  //private categorySelectedSubject = new Subject<number>();
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  // productsSimpleFilter$ = this.productService.productsWithCategory$.pipe(
  //   map((products) =>
  //     products.filter((product) =>
  //       this.selectedCategoryId
  //         ? product.categoryId === this.selectedCategoryId
  //         : true
  //     )
  //   )
  // );

  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedAction$,
  ]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter((product) =>
        selectedCategoryId ? product.categoryId === selectedCategoryId : true
      )
    ),
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  // Categories for drop down list
  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  sub: Subscription;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

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
    console.log("Not yet implemented");
  }

  onSelected(categoryId: string): void {
    //this.selectedCategoryId = +categoryId;
    this.categorySelectedSubject.next(+categoryId);
  }
}
