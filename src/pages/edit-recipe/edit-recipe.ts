import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams, ToastController} from "ionic-angular";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipes";
import {Recipe} from "../../models/recipe";

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipesService: RecipesService,
              private navCtrl: NavController
  ) {}

  ngOnInit()  {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit')  {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  onSubmit()  {
    const value = this.recipeForm.value;
    let ingredients = [];

    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return {
          name: name,
          amount: 1
        }
      });
    }

    if (this.mode == 'Edit')  {
      this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
    } else {
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }

    this.recipeForm.reset();
    this.navCtrl.popToRoot();

  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredients',
          handler: () =>  {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all ingredients',
          role: 'destructive',
          handler: () => {
            const formArray = <FormArray>this.recipeForm.get('ingredients');
            const len = formArray.length;
            if (len > 0)  {
              for (let i = len - 1; i >=0; i--) {
                formArray.removeAt(i);
              }
              this.showToast('Removed all', 1500, 'bottom');
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert()  {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null)  {
              this.showToast('Please enter a valid value', 1500, 'bottom');
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            this.showToast('Ingredient Added', 1500, 'bottom');
          }
        }
      ]
    })
  }

  private initializeForm()  {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode == 'Edit')  {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for(let ingredient of this.recipe.ingredients)  {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  private showToast(message: string, duration: number, position: string)  {
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    toast.present();
  }
}
