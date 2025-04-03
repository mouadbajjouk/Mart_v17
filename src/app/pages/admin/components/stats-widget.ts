import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stats-widget',
    imports: [CommonModule],
    styles: [
        `
      .card {
        background: #ffffff;
        padding: 2rem;
        margin-bottom: 2rem;
        border-radius: 6px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    `,
    ],
    template: `<div class="grid grid-cols-12 gap-4 grid-cols-12 gap-6">
    <div class="col-span-12 md:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between items-center mb-6">
          <div>
            <span class="block text-muted-color font-semibold mb-6"
              >Orders</span
            >
            <div class="text-color font-semibold text-xl">152</div>
          </div>
          <div
            class="flex items-center justify-center bg-blue-100 rounded-border"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-400 font-semibold">24 new </span>
        <span class="text-muted-color">since last visit</span>
      </div>
    </div>

    <div class="col-span-12 md:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between items-center mb-6">
          <div>
            <span class="block text-muted-color font-semibold mb-6"
              >Revenue</span
            >
            <div class="text-color font-semibold text-xl">$2,100</div>
          </div>
          <div
            class="flex items-center justify-center bg-orange-100 rounded-border"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-dollar text-orange-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-400 font-semibold">%52+ </span>
        <span class="text-muted-color">since last week</span>
      </div>
    </div>

    <div class="col-span-12 md:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between items-center mb-6">
          <div>
            <span class="block text-muted-color font-semibold mb-6"
              >Customers</span
            >
            <div class="text-color font-semibold text-xl">28,441</div>
          </div>
          <div
            class="flex items-center justify-center bg-cyan-100 rounded-border"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-users text-cyan-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-400 font-semibold">520 </span>
        <span class="text-muted-color">newly registered</span>
      </div>
    </div>

    <div class="col-span-12 md:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between items-center mb-6">
          <div>
            <span class="block text-muted-color font-semibold mb-6"
              >Comments</span
            >
            <div class="text-color font-semibold text-xl">152 Unread</div>
          </div>
          <div
            class="flex items-center justify-center bg-purple-100 rounded-border"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-comment text-purple-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-400 font-semibold">85 </span>
        <span class="text-muted-color">responded</span>
      </div>
    </div>
  </div> `
})
export class StatsWidget {}
