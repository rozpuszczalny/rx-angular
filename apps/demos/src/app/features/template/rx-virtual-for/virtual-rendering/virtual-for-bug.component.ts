import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { RxVirtualScrollViewportComponent } from '@rx-angular/template/experimental/virtual-scrolling';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rxa-virtual-for-feature-bug',
  template: `
    <div class="container">
      <h1 class="mat-headline mt-2">A bug</h1>
      <div>
        <textarea [(ngModel)]="monkeyJsonTxt"></textarea>
      </div>
      <button (click)="resetItems()">reset items</button>
      <button (click)="generateItems(generateNItems)">
        generate {{ generateNItems }} items
      </button>
      <button (click)="scrollTo(100)">scroll to 100</button>
      <button (click)="monkey()">monkey test</button>
      <button (click)="monkeyFromJson()">monkey test from json</button>
      <input type="number" [(ngModel)]="generateNItems" />
      <!-- <rx-virtual-scroll-viewport [dynamic]="fn"> -->
      <rx-virtual-scroll-viewport autosize [tombstoneSize]="40">
        <div *rxVirtualFor="let item of items$">
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

  monkeyJsonTxt = `[
    {
        "op": "scroll",
        "immediate": false,
        "delay": 121,
        "num": 843
    },
    {
        "op": "generate-items",
        "immediate": false,
        "delay": 923,
        "num": 3512
    },
    {
        "op": "reset",
        "immediate": false,
        "delay": 322,
        "num": 0
    },
    {
        "op": "scroll",
        "immediate": true,
        "delay": 9,
        "num": 154
    },
    {
        "op": "reset",
        "immediate": false,
        "delay": 332,
        "num": 0
    },
    {
        "op": "reset",
        "immediate": false,
        "delay": 378,
        "num": 0
    },
    {
        "op": "reset",
        "immediate": false,
        "delay": 390,
        "num": 0
    },
    {
        "op": "generate-items",
        "immediate": false,
        "delay": 615,
        "num": 228
    },
    {
        "op": "reset",
        "immediate": false,
        "delay": 748,
        "num": 0
    },
    {
        "op": "random-scroll",
        "immediate": false,
        "delay": 134,
        "num": 4617
    }
]`;

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

  monkeyFromJson() {
    const json = JSON.parse(this.monkeyJsonTxt);
    this.monkey(json);
  }

  generateMonkeyJson(
    iterations = 1000,
    maxOpDelay = 1000,
    immediateProb = 0.1,
  ) {
    const operations = [
      'generate-items',
      'random-scroll',
      'scroll',
      'reset',
    ] as const;

    const ops: {
      op: (typeof operations)[number];
      num: number;
      immediate: boolean;
      delay: number;
    }[] = [];

    for (let it = 0; it < iterations; it++) {
      const op = operations[Math.floor(Math.random() * operations.length)];
      const immediate = Math.random() < immediateProb;
      const delay = Math.round(Math.random() * maxOpDelay);
      switch (op) {
        case 'generate-items': {
          const num = Math.round(Math.random() * 5000);
          ops.push({ op, immediate, delay, num });
          break;
        }
        case 'reset':
          ops.push({ op, immediate, delay, num: 0 });
          break;
        case 'random-scroll': {
          const num = Math.round(Math.random() * 5000);
          ops.push({ op, immediate, delay, num });
          break;
        }
        case 'scroll': {
          const num = Math.round(Math.random() * this.items$.value.length);
          ops.push({ op, immediate, delay, num });
          break;
        }
      }
    }

    return ops;
  }

  async monkey(json = this.generateMonkeyJson()) {
    console.log('@@@@ Executing...', json);

    for (const { op, delay, immediate, num } of json) {
      switch (op) {
        case 'generate-items':
          const count = num;
          console.log('Generating ', count, ' items...');
          this.generateItems(count);
          break;
        case 'reset':
          console.log('resetting items');
          this.generateItems(0);
          break;
        case 'random-scroll': {
          const index = num;
          console.log('random scroll to ', index);
          this.scrollTo(index);
          break;
        }
        case 'scroll': {
          const index = num;
          console.log('scroll to ', index);
          this.scrollTo(index);
          break;
        }
      }
      if (immediate) {
        console.log('Immediately moving to a next operation');
        continue;
      }

      console.log('Waiting with next op for ', delay);
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  resetItems() {
    this.items$.next([]);
  }

  scrollTo(index: number) {
    this.viewport?.scrollToIndex(index);
  }
}
