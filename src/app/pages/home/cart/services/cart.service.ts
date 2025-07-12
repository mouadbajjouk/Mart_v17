import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  stored: string | null;
  items: Record<string, number> = {};

  constructor() {
    this.stored = localStorage.getItem('cart');

    if (this.stored) {
      this.items = JSON.parse(this.stored);
    }
  }

  addToCart(productId: string) {
    if (!this.items[productId]) {
      this.items[productId] = 1; // set quantity to 1 when just added
    } else {
      this.items[productId] += 1; // increment quantity when user clicks again
    }
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  getCartItemsIds(): { productId: string; quantity: number }[] {
    if (!this.stored) return [];

    const parsed = JSON.parse(this.stored) as Record<string, number>;

    return Object.entries(parsed).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));
  }
}
