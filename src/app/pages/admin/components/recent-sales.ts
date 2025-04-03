import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
// import { Product, ProductService } from '../../service/product.service';

@Component({
  selector: 'app-recent-sales-widget',
  imports: [CommonModule, TableModule, ButtonModule, RippleModule],
  template: `<div class="card !mb-8">
    <div class="font-semibold text-xl mb-12">Recent Sales</div>
    <p-table
      [value]="products"
      [paginator]="true"
      [rows]="5"
      responsiveLayout="scroll">
      <ng-template #header>
        <tr>
          <th>Image</th>
          <th pSortableColumn="name">
            Name <p-sortIcon field="name"></p-sortIcon>
          </th>
          <th pSortableColumn="price">
            Price <p-sortIcon field="price"></p-sortIcon>
          </th>
          <th>View</th>
        </tr>
      </ng-template>
      <ng-template #body let-product>
        <tr>
          <td style="width: 15%; min-width: 5rem;">
            <img
              src="https://primefaces.org/cdn/primevue/images/product/{{
                product.image
              }}"
              class="shadow-lg"
              alt="{{ product.name }}"
              width="50" />
          </td>
          <td style="width: 35%; min-width: 7rem;">{{ product.name }}</td>
          <td style="width: 35%; min-width: 8rem;">
            {{ product.price | currency: 'USD' }}
          </td>
          <td style="width: 15%;">
            <button
              pButton
              pRipple
              type="button"
              icon="pi pi-search"
              class="p-button p-component p-button-text p-button-icon-only"></button>
          </td>
        </tr>
      </ng-template>
    </p-table>
  </div>`,
})
export class RecentSalesWidget {
  products!: Prod[];

  //   constructor(private productService: ProductService) {}

  ngOnInit() {
    var item: Prod[] = [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
    ];
    this.products = item;
    console.log(this.products.length);
  }
}

interface Prod {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}
