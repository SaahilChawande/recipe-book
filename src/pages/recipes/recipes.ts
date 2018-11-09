import { Component } from '@angular/core';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {NavController} from "ionic-angular";
import {RecipesService} from "../../services/recipes";
import {Recipe} from "../../models/recipe";
import {RecipePage} from "../recipe/recipe";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(private navCtrl: NavController, private recipesService: RecipesService) {}

  onLoadRecipe(recipe: Recipe, index: number)  {
      this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }

  ionViewWillEnter()  {
    this.recipes = this.recipesService.getRecipes();
  }

  onAddRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }
}
