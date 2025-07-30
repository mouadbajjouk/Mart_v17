import { filter } from 'rxjs';
import { HttpService } from './../../../core/services/http.service';
import { Component, inject, OnInit } from '@angular/core';
import { PRIMENG_MODULES } from '../../../shared/primeng/primeng-modules';
import { CommonModule } from '@angular/common';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';
import { ProductService } from '../products/services/product.service';
import { environment } from '../../../../environments/environment';
import { StaticFiles } from '../../../core/enums/staticFiles';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  imports: [PRIMENG_MODULES, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];
  httpService = inject(HttpService);
  cartService = inject(CartService);
  productService = inject(ProductService);
  messageService = inject(MessageService);

  _cartItems: Record<string, number> = {};
  total = 0;

  ngOnInit(): void {
    const stored = localStorage.getItem('cart');

    if (!stored) {
      return;
    }

    this._cartItems = JSON.parse(stored);

    const productsIds = this.cartService
      .getCartItemsIds()
      .map(item => item.productId);

    this.productService.getProductsByIds(productsIds).subscribe({
      next: data => {
        data.forEach(product => {
          this.cartItems.push({
            id: product.id!,
            name: product.name!,
            price: product.price!,
            quantity: this._cartItems[product.id!],
            images: product.imageFiles!, // assuming it's an array
          });

          this.total += product.price! * this._cartItems[product.id!];
        });
      },
      error: err => {
        // Handle error silently or show user-friendly message
      },
    });
  }

  removeItem(productId: string) {
    this._cartItems = Object.fromEntries(
      Object.entries(this._cartItems).filter(([key]) => key !== productId)
    );

    this.cartItems = this.cartItems.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(this._cartItems));

    this.total = this.getTotal();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product removed from cart!',
      life: 3000,
    });
  }

  getProductImage(product: Cart) {
    if (!product.images || product.images.length == 0)
      return environment.baseUrl + StaticFiles.NotFound;

    if (!product.images[0].path && product.images[0].path?.length! > 0) {
      return environment.baseUrl + '/' + product.images[0].path;
    }

    return 'data:image/png;base64,' + product.images[0].bytes;
  }

  getTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.price * this._cartItems[item.id];
    });

    return total;
  }

  updateQuantity(productId: string, newQuantity: number) {
    if (newQuantity <= 0) {
      this.removeItem(productId);
      return;
    }

    this._cartItems[productId] = newQuantity;
    
    // Update the cart item in the array
    const cartItem = this.cartItems.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity = newQuantity;
    }

    localStorage.setItem('cart', JSON.stringify(this._cartItems));
    this.total = this.getTotal();

    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Updated',
    //   detail: 'Quantity updated successfully!',
    //   life: 2000,
    // });
  }

  increaseQuantity(productId: string) {
    const currentQuantity = this._cartItems[productId] || 0;
    this.updateQuantity(productId, currentQuantity + 1);
  }

  decreaseQuantity(productId: string) {
    const currentQuantity = this._cartItems[productId] || 0;
    this.updateQuantity(productId, currentQuantity - 1);
  }

  clearCart() {
    this.cartItems = [];
    this._cartItems = {};
    this.total = 0;
    localStorage.removeItem('cart');

    this.messageService.add({
      severity: 'success',
      summary: 'Cart Cleared',
      detail: 'All items removed from cart!',
      life: 3000,
    });
  }

  saveForLater(productId: string) {
    // For now, just show a message. You can implement wishlist functionality later
    this.messageService.add({
      severity: 'info',
      summary: 'Saved',
      detail: 'Item saved for later!',
      life: 2000,
    });
  }

  navigateToProducts() {
    // You can implement navigation logic here
    window.location.href = '/products';
  }

  navigateToCheckout() {
    // You can implement checkout navigation logic here
    this.messageService.add({
      severity: 'info',
      summary: 'Checkout',
      detail: 'Proceeding to checkout...',
      life: 2000,
    });
  }
}
