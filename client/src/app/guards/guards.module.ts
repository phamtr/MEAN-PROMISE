import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuardsRoutingModule } from '../guards/guard-routing.module';
import { ProductListComponent } from '../guards/product-list/product-list.component';

@NgModule({
  imports: [
    CommonModule,
    GuardsRoutingModule
  ],
  declarations: [ProductListComponent]
})
export class GuardsModule { }
