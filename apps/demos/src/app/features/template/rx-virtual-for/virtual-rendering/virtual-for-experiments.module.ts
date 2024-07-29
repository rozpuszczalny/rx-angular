import { ScrollingModule as AutosizedScrollingModule } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import {
  AutoSizeVirtualScrollStrategy,
  DynamicSizeVirtualScrollStrategy,
  FixedSizeVirtualScrollStrategy,
  RxVirtualFor,
  RxVirtualScrollElementDirective,
  RxVirtualScrollViewportComponent,
  RxVirtualScrollWindowDirective,
} from '@rx-angular/template/experimental/virtual-scrolling';
import { RxFor } from '@rx-angular/template/for';
import { RxIf } from '@rx-angular/template/if';
import { RxLet } from '@rx-angular/template/let';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select/index';
import { ValueProvidersModule } from '../../../../shared/debug-helper/value-provider/index';
import { VirtualForBugComponent } from './virtual-for-bug.component';
import { VirtualForDemoComponent } from './virtual-for-demo.component';
import { VirtualForReverseInfiniteScrollComponent } from './virtual-for-reverse-infinite-scroll.component';
import { VirtualForScrollWindowDemoComponent } from './virtual-for-scroll-window-demo.component';
import { VirtualForCustomScrollableDemoComponent } from './virtual-for-scrollable-demo.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'showcase',
        pathMatch: 'full',
      },
      {
        path: 'showcase',
        component: VirtualForDemoComponent,
      },
      {
        path: 'bug',
        component: VirtualForBugComponent,
      },
      {
        path: 'custom-scroll',
        component: VirtualForCustomScrollableDemoComponent,
      },
      {
        path: 'window-scrolling',
        component: VirtualForScrollWindowDemoComponent,
      },
      {
        path: 'reverse-infinite-scroll',
        component: VirtualForReverseInfiniteScrollComponent,
      },
    ]),
    ValueProvidersModule,
    RxLet,
    AutosizedScrollingModule,
    ScrollingModule,
    AutoSizeVirtualScrollStrategy,
    MatButtonModule,
    MatInputModule,
    FixedSizeVirtualScrollStrategy,
    DynamicSizeVirtualScrollStrategy,
    RxVirtualFor,
    StrategySelectModule,
    MatButtonToggleModule,
    CommonModule,
    RxIf,
    RxVirtualScrollViewportComponent,
    RxFor,
    RxVirtualScrollWindowDirective,
    RxVirtualScrollElementDirective,
    FormsModule,
  ],
  declarations: [
    VirtualForDemoComponent,
    VirtualForCustomScrollableDemoComponent,
    VirtualForScrollWindowDemoComponent,
    VirtualForBugComponent,
  ],
  providers: [],
})
export class RxVirtualForModule {}
