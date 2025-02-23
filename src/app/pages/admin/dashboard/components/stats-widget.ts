import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-stats-widget',
  imports: [CommonModule],
  styles: [
    `
      .card {
        background: #ffffff;
        padding: 2rem;
        margin-bottom: 2rem;
        border-radius: var(--content-border-radius);

        &:last-child {
          margin-bottom: 0;
        }
      }
    `,
  ],
  template: `<div class="grid">
    <div class="col-12 md:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between align-items-center mb-3">
          <div>
            <span class="block text-color-secondary font-semibold mb-3"
              >Orders</span
            >
            <div class="text-color font-semibold text-xl">152</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-primary font-semibold">24 new </span>
        <span class="text-color-secondary">since last visit</span>
      </div>
    </div>

    <div class="col-12 md:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between align-items-center mb-3">
          <div>
            <span class="block text-color-secondary font-semibold mb-3"
              >Revenue</span
            >
            <div class="text-color font-semibold text-xl">$2,100</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-dollar text-orange-500 text-xl"></i>
          </div>
        </div>
        <span class="text-primary font-semibold">%52+ </span>
        <span class="text-color-secondary">since last week</span>
      </div>
    </div>

    <div class="col-12 md:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between align-items-center mb-3">
          <div>
            <span class="block text-color-secondary font-semibold mb-3"
              >Customers</span
            >
            <div class="text-color font-semibold text-xl">28,441</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-users text-cyan-500 text-xl"></i>
          </div>
        </div>
        <span class="text-primary font-semibold">520 </span>
        <span class="text-color-secondary">newly registered</span>
      </div>
    </div>

    <div class="col-12 md:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between align-items-center mb-3">
          <div>
            <span class="block text-color-secondary font-semibold mb-3"
              >Comments</span
            >
            <div class="text-color font-semibold text-xl">152 Unread</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-purple-100 border-round"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-comment text-purple-500 text-xl"></i>
          </div>
        </div>
        <span class="text-primary font-semibold">85 </span>
        <span class="text-color-secondary">responded</span>
      </div>
    </div>
  </div> `,
})
export class StatsWidget {}
