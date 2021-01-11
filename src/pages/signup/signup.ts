import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AuthFirebaseProvider } from '../../providers/auth-firebase/auth-firebase';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  form: FormGroup;
  lastErrorCode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public formBuilder: FormBuilder, private authProvider: AuthFirebaseProvider) {
  }

  ionViewWillLoad() {
    this.form = this.formBuilder.group ({
      email: new FormControl ('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl ('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  goLogIn () {
    this.navCtrl.pop();
  }

  trySignUp () {
    this.authProvider.doRegister(this.form.value.email, this.form.value.password)
    .then(
      auth => {
        this.lastErrorCode = '';
        this.menuCtrl.swipeEnable(true);
        this.navCtrl.push(HomePage);
      },
      error => {
        this.lastErrorCode = error;
      }
    )
  }

}
