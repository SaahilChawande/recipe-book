import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";
import {PopoverController} from "ionic-angular";
import {SLOptionsPage} from "./sl-options/sl-options";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService, private popoverCtrl: PopoverController) {}

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
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({ev: event});
  }

}
