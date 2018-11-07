import { Component } from '@angular/core';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  constructor(public navCtrl: NavController) {}

  onAddRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }
}
