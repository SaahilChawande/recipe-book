import {Component, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Difficult'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams) {}

  ngOnInit()  {
    this.mode = this.navParams.get('mode');
  }

  private initializeForm()  {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required)
    });
  }
}
