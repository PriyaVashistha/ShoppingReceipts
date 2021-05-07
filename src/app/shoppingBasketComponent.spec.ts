import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ShoppingBasketComponent } from './shoppingBasketComponent';
import { IItemInput } from './shoppingBasketInterface';

describe('ShoppingBasketComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ShoppingBasketComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ShoppingBasketComponent);
    const instance = fixture.componentInstance;
    expect(instance).toBeTruthy();
  });

  it(`should have as title 'Receipt Details from Shopping Carts'`, () => {
    const fixture = TestBed.createComponent(ShoppingBasketComponent);
    const instance = fixture.componentInstance;
    expect(instance.title).toEqual('Receipt Details from Shopping Carts');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ShoppingBasketComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('._header span').textContent).toContain('Receipt Details from Shopping Carts');
  });

  describe('GenerateShoppingReceipt', () => {
    let shoppingItem : IItemInput;
    let instance: ShoppingBasketComponent;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ],
        declarations: [
          ShoppingBasketComponent
        ]
      }).compileComponents();    
      const fixture = TestBed.createComponent(ShoppingBasketComponent);
      instance = fixture.componentInstance;
  
      shoppingItem = {
        name: '1 16lb of Skittles',
        price: 13.00,
        isExemptFromTax: true,
        isImported: false
      } as IItemInput;
    });
  
    it('GetBaseTax is called to set base tax', () => {
      shoppingItem.isExemptFromTax = false;
      shoppingItem.price = 10.00;
      let shoppingBasket = [
        shoppingItem
      ] as Array<IItemInput>;
  
      const getBaseTaxSpy = spyOn(instance, 'GetBaseTax').and.returnValue(1.00);

      let resultItemWithTax = instance.GenerateShoppingBasketReceipt(shoppingBasket, 1).items[0];
      expect(getBaseTaxSpy).toHaveBeenCalledWith(false, 10.00);
      expect(resultItemWithTax.basicSalesTax).toBe(1.00);
    });

    it('GetImportDuty is called to set the import duty ', () => {
      shoppingItem.isImported = true;
      shoppingItem.price = 10.00;
      let shoppingBasket = [
        shoppingItem
      ] as Array<IItemInput>;

      const getImportDutySpy = spyOn(instance, 'GetImportDuty').and.returnValue(1.00);

      let resultItemWithTax = instance.GenerateShoppingBasketReceipt(shoppingBasket, 1).items[0];
      expect(getImportDutySpy).toHaveBeenCalledWith(true, 10.00);
      expect(resultItemWithTax.importDuty).toBe(1.00);
    });

    it('total tax is the sum of tax and duty', () => {
      shoppingItem.isExemptFromTax = false;
      shoppingItem.price = 10.00;
      let shoppingBasket = [
        shoppingItem
      ] as Array<IItemInput>;

      const tax = 1.00;
      const duty = 1.00;
      const expectedTotalTax = tax + duty;
  
      const getBaseTaxSpy = spyOn(instance, 'GetBaseTax').and.returnValue(tax);
      const getImportDutySpy = spyOn(instance, 'GetImportDuty').and.returnValue(duty);

      let result = instance.GenerateShoppingBasketReceipt(shoppingBasket, 1);
      expect(result.totalTax).toBe(expectedTotalTax);
    });

    it('total price is the sum of item price, tax and duty', () => {
      shoppingItem.isExemptFromTax = false;
      shoppingItem.price = 10.00;
      let shoppingBasket = [
        shoppingItem
      ] as Array<IItemInput>;

      const tax = 1.00;
      const duty = 1.00;
      const expectedTotalPrice = shoppingItem.price + tax + duty;
  
      const getBaseTaxSpy = spyOn(instance, 'GetBaseTax').and.returnValue(tax);
      const getImportDutySpy = spyOn(instance, 'GetImportDuty').and.returnValue(duty);

      let result = instance.GenerateShoppingBasketReceipt(shoppingBasket, 1);
      expect(result.totalPrice).toBe(expectedTotalPrice);
    });

    it('returns expected receipt object', () => {
      shoppingItem.isExemptFromTax = false;
      shoppingItem.price = 10.00;
      let shoppingItem2 = {
            name: '1 imported coffee bag',
            price: 80.00,
            isExemptFromTax: true,
            isImported: true
          } as IItemInput;
      let shoppingBasket = [
        shoppingItem,
        shoppingItem2
      ] as Array<IItemInput>;

      const tax = 1.00;
      const duty = 1.00;
      const expectedItem1PriceWithTax = shoppingItem.price + tax + duty;
      const expectedItem2PriceWithTax = shoppingItem2.price + tax + duty;
  
      const getBaseTaxSpy = spyOn(instance, 'GetBaseTax').and.returnValue(tax);
      const getImportDutySpy = spyOn(instance, 'GetImportDuty').and.returnValue(duty);

      let result = instance.GenerateShoppingBasketReceipt(shoppingBasket, 1);
      expect(result.items.length).toBe(2);
      let item1Receipt = result.items[0];
      let item2Receipt = result.items[1];
      expect(item1Receipt.name).toBe(shoppingItem.name);
      expect(item1Receipt.price).toBe(shoppingItem.price);
      expect(item2Receipt.name).toBe(shoppingItem2.name);
      expect(item2Receipt.price).toBe(shoppingItem2.price);
      expect(result.totalPrice).toBe(expectedItem1PriceWithTax + expectedItem2PriceWithTax);
      expect(result.totalTax).toBe(4);
      expect(result.id).toBe(2);
    });
  
  });

  describe('GetImportDuty', () => {
    let instance: ShoppingBasketComponent;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ],
        declarations: [
          ShoppingBasketComponent
        ]
      }).compileComponents();    
      const fixture = TestBed.createComponent(ShoppingBasketComponent);
      instance = fixture.componentInstance;
    });

    it('returns zero when item is not imported', () => {
      const isImported = false;
      let result = instance.GetImportDuty(isImported, 10.00);
      expect(result).toBe(0.00);
    });
  });

  describe('GetBaseTax', () => {
    let instance: ShoppingBasketComponent;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ],
        declarations: [
          ShoppingBasketComponent
        ]
      }).compileComponents();    
      const fixture = TestBed.createComponent(ShoppingBasketComponent);
      instance = fixture.componentInstance;
    });

    it('returns zero when Tax is exempt', () => {
      const isTaxEmempt = true;
      let result = instance.GetBaseTax(isTaxEmempt, 10.00);
      expect(result).toBe(0.00);
    });
  });

});


