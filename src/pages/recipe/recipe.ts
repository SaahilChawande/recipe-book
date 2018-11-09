import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../models/recipe";
import {NavController, NavParams} from "ionic-angular";
import {EditRecipePage} from "../edit-recipe/edit-recipe";

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
  recipe: Recipe;
  index: number;

  constructor(private navCtrl: NavController, private navParams: NavParams) {}

  ngOnInit()  {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onAddIngredients()  {}

  onEditRecipe()  {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index});
  }

  onDeleteRecipe()  {}
}
