import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing.module';
import { ShoppingBasketComponent } from './shoppingBasketComponent';

@NgModule({
  declarations: [
    ShoppingBasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ShoppingBasketComponent]
})
export class AppModule { }
