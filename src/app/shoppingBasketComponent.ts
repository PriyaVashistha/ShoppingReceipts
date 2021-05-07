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

/**
   * Sets shopping basket input data and processes it to produce final output
    */
export class ShoppingBasketComponent {
  title = 'Receipt Details from Shopping Carts';
  errorEncountered = false;
  errorMessage = '';

  shoppingBaseketObs: Observable<IShoppingBasket> = from(shoppingBaskets);

  shoppingBasketReceiptObs = this.shoppingBaseketObs
              .pipe(map((shoppingBasket, index) => {
                return this.GenerateShoppingBasketReceipt(shoppingBasket.items, shoppingBasket.id);
              }));

  //stores final output information
  shoppingBasketReceipts: Array<IReceipt> = [];

  ngOnInit(){
    //populate the output object
    this.shoppingBasketReceiptObs.subscribe(
      val => {
        this.shoppingBasketReceipts.push(val);
      },
      err => { 
        this.errorEncountered = true;
        this.errorMessage = err;
      }
    );
  }

  /**
   * Process shopping basket items and applies tax information
   * @param items list of input shopping basket items
   * @param basketId basket id
   * @returns final receipt - shopping basket information with tax and duty
    */
  GenerateShoppingBasketReceipt(items: IItemInput[], basketId: number) : IReceipt {
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
      id: basketId,
      items: itemsWithTax,
      totalPrice: totalPrice,
      totalTax: totalTax 
    }as IReceipt
  }

   /**
   * Calculates applicable sales tax
   * @param isExempt true if item is exempt from tax
   * @param price base item price before tax
   * @returns 0.00 if exempt, otherwise returns the calculated tax value
    */
  GetBaseTax(isExempt: boolean, price:number): number {
    return isExempt ? 0.00 : Util.CalculateBasicSalesTax(price);
  }

  /**
   * Calculates applicable import duty
   * @param isImported true if item is imported
   * @param price base item price before tax
   * @returns 0.00 if item is not imported, otherwise returns the calculated duty value
    */
  GetImportDuty(isImported: boolean, price:number): number {
    return isImported ? Util.CalculateImportDuty(price) : 0.00;
  }

}

/**
   * Create object with input shopping basket data
    */
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