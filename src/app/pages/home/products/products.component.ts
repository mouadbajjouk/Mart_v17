import { Product } from './../../../domain/product';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-products',
    imports: [CommonModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
    products: Product[] = [];
    
    ngOnInit(): void {
        this.products.push({name: "d", description: "fk", price: 4})
    }

}
