import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { GetResponseProducts, ProductService } from '../productservice';
import { Product } from '../product';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  private readonly ID = 'id';
  private readonly KEYWORD = 'keyword';

  products: Product[];
  searchMode: boolean;
  categoryName: string;
  searchKeyword: string;
  previousCategoryId: number;

  // For pagination

  private paramsSubscription: Subscription;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has(this.KEYWORD);
    if (this.searchMode) {
      const keyword = this.route.snapshot.paramMap.get(this.KEYWORD) ;
      this.searchKeyword = keyword==null? 'All' : keyword;
      this.handleSearchProducts(this.searchKeyword);
    } else {
      this.fetchProducts();
    }
  }


  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  private handleSearchProducts(keyword: string): void {
    this.fetchSearchProducts(keyword);
  }

  private fetchSearchProducts(keyword: string): void {
    if(keyword==='All')
    {
      this.fetchProducts();
    }
    else
    {
      this.productService.searchProduct(keyword)
      .subscribe(this.handleResponseProducts.bind(this));
    }
  }

  private fetchProducts(): void {
    this.productService.getAllProducts()
      .subscribe(this.handleResponseProducts.bind(this));
  }


  private handleResponseProducts(response: Product[]) {
    this.products = response;
  }

}
