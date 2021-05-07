//Rounds value to the nearest multiple of the given number - rounds to 0.05 by default
export function RoundToNearest(value: number, roundTo: number = 0.05): number {
    return roundTo*(Math.ceil(value/roundTo));
}

//calculates sales tax and returns rounded value - 10% sales tax is applied by default
export function CalculateBasicSalesTax(price: number, salesTax: number = 0.1): number {
    return RoundToNearest(price * salesTax);
}

//calculates import duty and returns rounded value = 5% import duty is applied by default
export function CalculateImportDuty(price: number, duty: number = 0.05): number {
    return RoundToNearest(price * duty);
}