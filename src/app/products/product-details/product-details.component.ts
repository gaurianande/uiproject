import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../productservice';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly ID = 'id';
  product: Product;
  private paramsSubscription: Subscription;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      debugger;
      this.handleProductDetails(params);
    });
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  private handleProductDetails(params: ParamMap) {
    this.productService.getProduct(Number(params.get(this.ID))).subscribe(product => {
      this.product = product;
    });
  }
}
