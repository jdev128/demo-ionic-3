import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PostsPage } from '../pages/posts/posts';
import { AuthFirebaseProvider } from '../providers/auth-firebase/auth-firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav')
  nav;
  rootPage:any = LoginPage;
  pages: Array<{title: string, icon: string, view: any, active: boolean}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public authProvider: AuthFirebaseProvider) {
    this.initializeApp();
    this.pages = [{title:"Home", icon:"home", view: HomePage, active: true},
    {title:"Posts", icon:"paper", view: PostsPage, active: false},
    {title:"Cerrar Sesi\u00F3n", icon:"log-out", view: LoginPage, active: false}]
  }

  initializeApp () {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  handleNav (event: UIEvent, page) {
    this.pages.forEach( x => {
      x.active=false;
    });
    switch (page.view) {
      case HomePage:
        this.pages[0].active=true;
        this.nav.push(HomePage);
        break;
      case PostsPage:
        this.pages[1].active=true;
        this.nav.push(PostsPage);
        break;
      case LoginPage:
        this.pages[2].active=true;
        this.authProvider.doLogout()
        .then(
          success => this.nav.push(LoginPage)
        );
    }
  }

}

