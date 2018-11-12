import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";
import {AlertController, LoadingController, PopoverController} from "ionic-angular";
import {SLOptionsPage} from "./sl-options/sl-options";
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {}

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    console.log(this.shoppingListService.getItems());
    this.loadItems();
  }

  ionViewWillEnter()  {
    this.loadItems();
  }

  private loadItems() {
    this.ingredients = this.shoppingListService.getItems();
  }

  onItemClick(index: number)  {
    this.shoppingListService.removeItem(index);
    this.loadItems();
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
              this.shoppingListService.fetchList(token)
                .subscribe(
                  (list: Ingredient[]) => {
                    loader.dismiss();
                    if (list) {
                      this.ingredients = list;
                    } else {
                      this.ingredients = [];
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
              this.shoppingListService.storeList(token)
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
