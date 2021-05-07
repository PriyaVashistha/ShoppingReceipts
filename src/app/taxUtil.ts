export function RoundToNearest(value: number, roundTo: number = 0.05): number {
    return roundTo*(Math.ceil(value/roundTo));
}

export function CalculateBasicSalesTax(price: number, salesTax: number = 0.1): number {
    return RoundToNearest(price * salesTax);
}

export function CalculateImportDuty(price: number, duty: number = 0.05): number {
    return RoundToNearest(price * duty);
}