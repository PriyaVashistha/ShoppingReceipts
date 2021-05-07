export interface IItemInput {
    name: string;
    price: number;
    isImported: boolean;
    isExemptFromTax: boolean;
}

export interface IShoppingBasket {
    id: number;
    items: IItemInput[];
}

export interface IItemWithTax {
    name: string;
    price: number;
    basicSalesTax: number;
    importDuty: number;
    priceWithTax: number;
}

export interface IReceipt {
    id: number;
    items: IItemWithTax[];
    totalTax: number;
    totalPrice: number;
}