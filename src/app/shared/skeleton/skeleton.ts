import { CommonModule } from '@angular/common';
import { PRIMENG_MODULES } from '../primeng/primeng-modules';
import { Component, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [CommonModule, PRIMENG_MODULES],
  template: `<div class="card">
    <p-table [value]="skeletonData!" responsiveLayout="scroll">
      <ng-template #header>
        <tr>
          @for (skeletonHeader of skeletonHeaders(); track skeletonHeader) {
            <th>{{ skeletonHeader }}</th>
          }
        </tr>
      </ng-template>
      <ng-template #body let-skeletonData>
        <tr>
          @for (_ of skeletonHeaders(); track _) {
            <td><p-skeleton /></td>
          }
        </tr>
      </ng-template>
    </p-table>
  </div>`,
  styles: ``,
})
export class SkeletonComponent implements OnInit {
  skeletonData: any[] | undefined;
  skeletonHeaders = input.required<string[]>();

  ngOnInit() {
    this.skeletonData = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
  }
}
