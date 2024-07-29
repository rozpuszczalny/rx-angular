import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { RxVirtualScrollViewportComponent } from '@rx-angular/template/experimental/virtual-scrolling';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rxa-virtual-for-feature-bug',
  template: `
    <div class="container">
      <h1 class="mat-headline mt-2">A bug</h1>
      <button (click)="resetItems()">reset items</button>
      <button (click)="generateItems(generateNItems)">
        generate {{ generateNItems }} items
      </button>
      <button (click)="generateItems(2)">generate {{ 2 }} items</button>
      <button (click)="generateItems(100)">generate {{ 100 }} items</button>
      <button (click)="scrollTo(100)">scroll to 100</button>
      <input type="number" [(ngModel)]="generateNItems" />
      <!-- <rx-virtual-scroll-viewport [dynamic]="fn"> -->
      <rx-virtual-scroll-viewport autosize [tombstoneSize]="40">
        <div *rxVirtualFor="let item of items$; strategy: 'immediate'">
          {{ item.name }}
        </div>
      </rx-virtual-scroll-viewport>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      rx-virtual-scroll-viewport {
        flex-grow: 1;
      }

      button {
        margin: 0.5rem;
      }

      .container {
        height: calc(100vh - 64px);
        overflow: hidden;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualForBugComponent {
  items$ = new BehaviorSubject([
    { id: 1, name: 'test' },
    { id: 2, name: 'test' },
  ]);
  fn = (a: any) => 40;

  generateNItems = 100;

  @ViewChild(RxVirtualScrollViewportComponent)
  viewport!: RxVirtualScrollViewportComponent;

  constructor() {
    this.generateItems();
  }

  generateItems(n = 1000) {
    const items = [];
    for (let id = 0; id < n; id++) {
      items.push({ id, name: `test ${id}` });
    }

    this.items$.next(items);
  }

  resetItems() {
    this.items$.next([]);
  }

  scrollTo(index: number) {
    this.viewport?.scrollToIndex(index);
  }
}
