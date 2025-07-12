import { Product } from './../../../domain/product';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { environment } from '../../../../environments/environment';
import { StaticFiles } from '../../../core/enums/staticFiles';
import { CartService } from '../cart/services/cart.service';
import { PRIMENG_MODULES } from '../../../shared/primeng/primeng-modules';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  imports: [CommonModule, PRIMENG_MODULES],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  messageService: MessageService = inject(MessageService);

  ngOnInit(): void {
    this.productService.getProductsData().subscribe({
      next: data => (this.products = data.slice(0, 10)),
      error: () => console.log('rrrrr'),
    });
  }

  getProductImage(product: Product) {
    if (!product.imageFiles || product.imageFiles.length == 0)
      return environment.baseUrl + StaticFiles.NotFound;

    if (
      !product.imageFiles[0].path &&
      product.imageFiles[0].path?.length! > 0
    ) {
      return environment.baseUrl + '/' + product.imageFiles[0].path;
    }

    return 'data:image/png;base64,' + product.imageFiles[0].bytes;
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId);

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Added to cart',
      life: 3000,
    });
  }
}
