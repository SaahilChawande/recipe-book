import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  onSignup(form: NgForm)  {
    console.log(form.value);
  }
}
