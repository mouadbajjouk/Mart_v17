import { Component, inject } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Product } from '../../../domain/product';
import { ProductService } from '../../../services/product.service';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { StaticFiles } from '../../../core/enums/staticFiles';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, TagModule, ButtonModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: Product[] = [];

  responsiveOptions: any[] | undefined;

  productService: ProductService = inject(ProductService);

  constructor() {}

  ngOnInit() {
    this.productService.getProductsData().subscribe({
      next: data => (this.products = data.slice(0, 10)),
      error: () => console.log('rrrrr'),
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getSeverity(
    quantity: number
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warn'
    | 'danger'
    | 'contrast'
    | undefined {
    if (quantity > 50) {
      return 'success';
    }

    if (quantity >= 1) {
      return 'warn';
    }

    if (quantity >= 0) {
      return 'danger';
    }

    return undefined;
  }

  getInventoryStatus(quantity: number) {
    if (quantity > 50) {
      return 'INSTOCK';
    }

    if (quantity >= 1) {
      return 'LOWSTOCK';
    }

    if (quantity === 0) {
      return 'OUTOFSTOCK';
    }

    return undefined;
  }

  getProductImage(product: Product) {
    if (!product.imageFiles || product.imageFiles.length == 0)
      return environment.baseUrl + StaticFiles.NotFound;

    return 'data:image/png;base64,' + product.imageFiles[0].bytes;
  }
}
