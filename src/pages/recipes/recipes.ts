import { Component } from '@angular/core';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {AlertController, LoadingController, NavController, PopoverController} from "ionic-angular";
import {RecipesService} from "../../services/recipes";
import {Recipe} from "../../models/recipe";
import {RecipePage} from "../recipe/recipe";
import {SLOptionsPage} from "../shopping-list/sl-options/sl-options";
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(private navCtrl: NavController,
              private recipesService: RecipesService,
              private popoverCtrl: PopoverController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private authService: AuthService
  ) {}

  onLoadRecipe(recipe: Recipe, index: number)  {
      this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }

  ionViewWillEnter()  {
    this.recipes = this.recipesService.getRecipes();
  }

  onAddRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onShowOptions(event: MouseEvent)  {
    const loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(data => {
      if (!data)  {
        return;
      }
      if (data.action == 'load')  {
        loader.present();
        this.authService.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.recipesService.fetchList(token)
                .subscribe(
                  (list: Recipe[]) => {
                    loader.dismiss();
                    if (list) {
                      this.recipes = list;
                    } else {
                      this.recipes = [];
                    }
                  },
                  error => {
                    loader.dismiss();
                    this.handleError(error.message);
                  }
                )
            }
          )
      } else if (data.action == 'store') {
        loader.present();
        this.authService.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.recipesService.storeList(token)
                .subscribe(
                  () => loader.dismiss(),
                  error => {
                    loader.dismiss();
                    this.handleError(error.message);
                  }
                )
            }
          );
      }
    });
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred',
      message: errorMessage,
      buttons: ['Ok']
    }).present();
  }
}
