import { Component, inject } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Product } from '../../../domain/product';
import { ProductService } from '../../../services/product.service';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

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
      next: data => (this.products = data.slice(0, 5)),
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
    status: string
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warn'
    | 'danger'
    | 'contrast'
    | undefined {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined;
    }
  }
}
