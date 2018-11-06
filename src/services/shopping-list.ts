import {Ingredient} from "../models/ingredient";

export class ShoppingListService  {
  private ingredients: Ingredient[] = [];

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);  //deconstruct the items array and then push each item
  }

  getItems()  {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }
}
