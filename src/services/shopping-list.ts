import {Ingredient} from "../models/ingredient";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "./auth";
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService  {
  private ingredients: Ingredient[] = [];

  constructor(private http: Http, private authService: AuthService) {}

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

  storeList(token: string)  {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic2-recipebook-79abe.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
      .map((response: any) => {
        return response.json();
      });
  }

  fetchList(token: string)  {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic2-recipebook-79abe.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
      .map((response: any) => {
        return response.json();
      })
      .do((data) => {
        this.ingredients = data;
      });
  }
}
