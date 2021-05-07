/**
   * Rounds the given value to the nearest multiple of the given number
   * @param value value to round
   * @param roundTo round to nearest multiple of this number, 0.05 by default
   * @returns rounded number
    */
export function RoundToNearest(value: number, roundTo: number = 0.05): number {
    return roundTo*(Math.ceil(value/roundTo));
}

/**
   * Calculates sales tax
   * @param price price to calculate tax on
   * @param salesTax applicable tax, 10% by default
   * @returns calculated tax
    */
export function CalculateBasicSalesTax(price: number, salesTax: number = 0.1): number {
    return RoundToNearest(price * salesTax);
}

/**
   * Calculates import duty
   * @param price price to calculate import duty on
   * @param duty applicable duty, 5% by default
   * @returns calculated import duty
    */
export function CalculateImportDuty(price: number, duty: number = 0.05): number {
    return RoundToNearest(price * duty);
}