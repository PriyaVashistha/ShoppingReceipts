import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import * as TaxUtil from './taxUtil';

describe('RoundToNearest', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ]
      }).compileComponents();
    });

    it('Returns value rounded to 0.05 by default', () => {
        const valueToRound = 10.00;
        var expectedResult = 0.05*(Math.ceil(valueToRound/0.05));
        var result = TaxUtil.RoundToNearest(valueToRound);
        expect(result).toBe(expectedResult);
    });

    it('Returns value rounded to passed parameter', () => {
        const valueToRound = 10.00;
        const roundToNumber = 0.15;
        var expectedResult = roundToNumber*(Math.ceil(valueToRound/roundToNumber));
        var result = TaxUtil.RoundToNearest(valueToRound, roundToNumber);
        expect(result).toBe(expectedResult);
    })
});

describe('CalculateBasicSalesTax', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ]
      }).compileComponents();
    });

    it('Applies 10% sales tax by default', () => {
        const price = 10.00;
        const tax = 0.1;
        var expectedResult = 0.05*(Math.ceil(price*tax/0.05));
        var result = TaxUtil.CalculateBasicSalesTax(price);
        expect(result).toBe(expectedResult);
    });

    it('Applies tax based on the passed parameter', () => {
        const price = 10.00;
        const tax = 0.3;
        var expectedResult = 0.05*(Math.ceil(price*tax/0.05));
        var result = TaxUtil.CalculateBasicSalesTax(price, tax);
        expect(result).toBe(expectedResult);
    })
});

describe('CalculateImportDuty', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ]
      }).compileComponents();
    });

    it('Applies 5% import duty by default', () => {
        const price = 10.00;
        const duty = 0.05;
        var expectedResult = 0.05*(Math.ceil(price*duty/0.05));
        var result = TaxUtil.CalculateImportDuty(price);
        expect(result).toBe(expectedResult);
    });

    it('Applies import duty based on the passed parameter', () => {
        const price = 10.00;
        const duty = 0.3;
        var expectedResult = 0.05*(Math.ceil(price*duty/0.05));
        var result = TaxUtil.CalculateImportDuty(price, duty);
        expect(result).toBe(expectedResult);
    })
});