# ReceiptDetails

This project generates receipts from predefined shopping data. Angular, RxJS and Typescript have been used to implement the solution. 

***It is assumed that the application does not take any user input, the input will always be the shopping baskets given in the exercise document.***

## What I used to build this project
* Windows machine
* Visual Studio Code - v1.56.0
* Node - v14.16.1
* Angular CLI - v11.2.11

## Code Files
Main code files are located in src/app directory
* ***shoppingBasketComponent.ts*** - Contains the ShoppingBasketComponent class that creates input object and  has logic to manipulate input to generate final shopping basket receipts.
* ***shoppingBasketComponent.spec.ts*** - Contains unit tests for shoppingBasketComponent.ts
* ***shoppingBasketInterface.ts*** - User defined interfaces needed to structure data are declared here.
* ***shoppingBasket.html*** - Contains code to display shopping basket data.
* ***shoppingBasket.css*** - Contains styles used to display data.
* ***taxUtil.ts*** - Contains tax calculation and rounding functions.
* ***taxUtil.spec.ts*** - Unit tests for taxUtil.ts.

## Running the project and tests
* Install node from https://nodejs.org/en/download/
* To install Angular CLI, open Command Prompt and run `npm install -g @angular/cli`.

Once Node and Angular CLI are installed, navigate to the project directory in command line.
* Run `npm install`, this will install all project dependencies.
* To run the application - run `ng-serve` and navigate to `http://localhost:4200/` in browser. The output should now be visible in the browser window.
* To execute unit tests - run `ng-test`.

## Output format
In the output displayed, each shopping basket consists of 5 columns
* ***Name*** - Item name information from input
* ***Base Price*** - Item price information from input
* ***Sales Tax*** - Applicable tax based on base price. Displays "Exempt" for items that are exempt from tax.
* ***Import Duty*** - Applicable Import duty on base price. Displays "Exempt" for items exempt form import duty.
* ***Price with tax*** - Displays final price of the item with tax.

Last two rows of each shopping basket are **Sales Tax** and **Total**. 
* ***Sales Tax***  - Sum of total taxes for all items in the shopping basket
* ***Total*** - Final price incuding tax of all items in the shopping basket.
