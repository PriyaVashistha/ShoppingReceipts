/**
   * Interface for input data representing each item in shopping basket
   * @param name given item name
   * @param price given base price
   * @param isImported true if item is imported
   * @param isExemptFromTax true if item is exempt from tax
    */
export interface IItemInput {
    name: string;
    price: number;
    isImported: boolean;
    isExemptFromTax: boolean;
}

/**
   * Interface for input data repersenting a shopping basket
   * @param id shopping basket id
   * @param items list of all given items in the basket
    */
export interface IShoppingBasket {
    id: number;
    items: IItemInput[];
}

/**
   * Interface for output data representing each item in shopping basket with tax information
   * @param name given item name
   * @param price given base price
   * @param basicSalesTax applicable sales tax on item
   * @param importDuty applicable import duty on item
   * @param priceWithTax item price including taxes
    */
export interface IItemWithTax {
    name: string;
    price: number;
    basicSalesTax: number;
    importDuty: number;
    priceWithTax: number;
}

/**
   * Interface for output data repersenting a shopping basket receipt
   * @param id shopping basket id
   * @param items list of all items including their respective tax information
   * @param totalTax taxes to be paid for all items in the shopping basket
   * @param totalPrice final price of all items in the shopping basket including taxes
    */
export interface IReceipt {
    id: number;
    items: IItemWithTax[];
    totalTax: number;
    totalPrice: number;
}