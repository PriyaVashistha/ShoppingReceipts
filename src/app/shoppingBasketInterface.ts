//Interface for the shopping basket items from given input data
export interface IItemInput {
    name: string;
    price: number;
    isImported: boolean;
    isExemptFromTax: boolean;
}

//Interface repersenting shopping basket from input data
export interface IShoppingBasket {
    id: number;
    items: IItemInput[];
}

//Shopping basket items with tax and duty information
export interface IItemWithTax {
    name: string;
    price: number;
    basicSalesTax: number;
    importDuty: number;
    priceWithTax: number;
}

//Output shopping basket receipts including tax and duty
export interface IReceipt {
    id: number;
    items: IItemWithTax[];
    totalTax: number;
    totalPrice: number;
}