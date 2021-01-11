import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserDetailPage } from '../pages/user-detail/user-detail';
import { RandomUserServiceProvider } from '../providers/random-user-service/random-user-service';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { PostsPage } from '../pages/posts/posts';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AuthFirebaseProvider } from '../providers/auth-firebase/auth-firebase';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserDetailPage,
    LoginPage,
    SignupPage,
    PostsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserDetailPage,
    LoginPage,
    SignupPage,
    PostsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RandomUserServiceProvider,
    AuthFirebaseProvider
  ]
})
export class AppModule {}
