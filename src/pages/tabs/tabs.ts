import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ShoppingListPage} from "../shopping-list/shopping-list";
import {RecipesPage} from "../recipes/recipes";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  shoppingListPage = ShoppingListPage;
  recipesPage = RecipesPage;

  constructor() {}

}
