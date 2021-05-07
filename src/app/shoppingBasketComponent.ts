import { Component } from '@angular/core';
import { IShoppingBasket, IItemWithTax, IReceipt, IItemInput } from './shoppingBasketInterface';
import * as Util from './taxUtil';
import { from, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './shoppingBasket.html',
  styleUrls: ['./shoppingBasket.css']
})

export class ShoppingBasketComponent {
  title = 'Receipt Details from Shopping Carts';  
  shoppingBaseketObs: Observable<IShoppingBasket> = from(shoppingBaskets);

  shoppingBasketReceiptObs = this.shoppingBaseketObs
              .pipe(map((shoppingBasket, index) => {
                return this.GenerateShoppingBasketReceipt(shoppingBasket.items, index);
              }));

  shoppingBasketReceipts: Array<IReceipt> = [];

  ngOnInit(){
    
    this.shoppingBasketReceiptObs.subscribe(
      val => {
        this.shoppingBasketReceipts.push(val);
      }
    );
  }

  GenerateShoppingBasketReceipt(items: IItemInput[], basketIndex: number) : IReceipt {
    let totalTax = 0.00;
    let totalPrice = 0.00;
    let itemsWithTax = items.map(item => {
      let tax = this.GetBaseTax(item.isExemptFromTax, item.price);
      let duty = this.GetImportDuty(item.isImported, item.price);
      let data = {
          name: item.name,
          price: item.price,
          basicSalesTax: tax,
          importDuty: duty,
          priceWithTax: item.price + tax + duty
        } as IItemWithTax;
        totalTax += tax + duty;
        totalPrice += data.priceWithTax;
        return data;
    });
    return {
      id: basketIndex + 1,
      items: itemsWithTax,
      totalPrice: totalPrice,
      totalTax: totalTax
    }as IReceipt
  }

  GetBaseTax(isExempt: boolean, price:number): number {
    return isExempt ? 0.00 : Util.CalculateBasicSalesTax(price);
  }

  GetImportDuty(isImported: boolean, price:number): number {
    return isImported ? Util.CalculateImportDuty(price) : 0.00;
  }

}

const shoppingBaskets: Array<IShoppingBasket> = [
  {
    id: 1,
    items: [
      {
          name: '1 16lb of Skittles',
          price: 16.00,
          isExemptFromTax: true,
          isImported: false
        } ,
        {
          name: '1 Walkman',
          price: 99.99,
          isExemptFromTax: false,
          isImported: false
        },
        {
          name: '1 bag of microwave Popcorn',
          price: 0.99,
          isExemptFromTax: true,
          isImported: false
        }
      ]
  },
  {
    id: 2,
    items: [
      {
        name: '1 imported bag of Vanilla-Hazelnut Coffee',
        price: 11.00,
        isExemptFromTax: true,
        isImported: true
      },
      {
        name: '1 Imported Vespa',
        price: 15001.25,
        isExemptFromTax: false,
        isImported: true
      }
    ]
  },
  {
    id: 3,
    items: [
      {
        name: '1 imported crate of Almond Snickers',
        price: 75.99,
        isExemptFromTax: true,
        isImported: true
      },
      {
        name: '1 Discman',
        price: 55.00,
        isExemptFromTax: false,
        isImported: false
      },
      {
        name: '1 Imported Bottle of Wine',
        price: 10.00,
        isExemptFromTax: false,
        isImported: true
      },
      {
        name: '1 300# bag of Fair-Trade Coffee',
        price: 997.99,
        isExemptFromTax: true,
        isImported: false
      }
    ]
  }
];