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
  //shoppingBaseketObs wraps the input data
  shoppingBaseketObs: Observable<IShoppingBasket> = from(shoppingBaskets);//shoppingBaskets is initialized below with input data

  //processes input shopping basket data to final shopping basket receipts
  shoppingBasketReceiptObs = this.shoppingBaseketObs
              .pipe(map((shoppingBasket, index) => {
                //GenerateShoppingBasketReceipt adds tax and duty details and returns final receipts
                return this.GenerateShoppingBasketReceipt(shoppingBasket.items, index);
              }));

  //stores final output information
  shoppingBasketReceipts: Array<IReceipt> = [];

  ngOnInit(){
    //populate the output object
    this.shoppingBasketReceiptObs.subscribe(
      val => {
        this.shoppingBasketReceipts.push(val);
      }
    );
  }

  //Process shopping basket items and applies tax information
  GenerateShoppingBasketReceipt(items: IItemInput[], basketIndex: number) : IReceipt {
    let totalTax = 0.00;
    let totalPrice = 0.00;
    let itemsWithTax = items.map(item => {
      let tax = this.GetBaseTax(item.isExemptFromTax, item.price); //GetBaseTax calculates tax if applicable
      let duty = this.GetImportDuty(item.isImported, item.price); //GetImportDuty calculates import duty if applicable
      let data = {
          name: item.name,
          price: item.price,
          basicSalesTax: tax,
          importDuty: duty,
          priceWithTax: item.price + tax + duty // final item price is the item price after tax and import duty
        } as IItemWithTax;
        totalTax += tax + duty; //total taxes (tax + duty) for all items in the shopping basket
        totalPrice += data.priceWithTax; //total price with taxes for all items in the shopping basket
        return data;
    });
    return {
      id: basketIndex + 1, //shopping basket id/number
      items: itemsWithTax, //collection of shopping basket items with tax informatiopn
      totalPrice: totalPrice, //total price with tax for the shopping basket
      totalTax: totalTax //total taxes applied to the shopping price
    }as IReceipt
  }

  GetBaseTax(isExempt: boolean, price:number): number {
    //Only calculate tax if applicable
    return isExempt ? 0.00 : Util.CalculateBasicSalesTax(price);
  }

  GetImportDuty(isImported: boolean, price:number): number {
    //Only calculate import duty if applicable
    return isImported ? Util.CalculateImportDuty(price) : 0.00;
  }

}

//Create object with input shopping basket data
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