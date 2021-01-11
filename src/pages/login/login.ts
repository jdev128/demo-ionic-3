import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthFirebaseProvider } from '../../providers/auth-firebase/auth-firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;
  lastErrorCode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public authProvider: AuthFirebaseProvider, public formBuilder: FormBuilder) {
  }

  ionViewWillLoad() {
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required,Validators.email])),
      password: new FormControl ('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menuCtrl.swipeEnable(false);
  }

  ionViewWillUnload() {
    this.menuCtrl.swipeEnable(true);
  }

  goSignUp () {
    this.navCtrl.push(SignupPage);
  }

  tryLogin () {
    this.authProvider.doLogin(this.form.value.email, this.form.value.password)
    .then(
      auth => {
        this.lastErrorCode = '';
        this.navCtrl.push(HomePage);
      },
      error => {
        this.lastErrorCode = error;
      }
    )

  }

}
