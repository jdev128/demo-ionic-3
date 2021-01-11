import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

/*
  Generated class for the AuthFirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthFirebaseProvider {

  constructor(public http: HttpClient, public fireAuth: AngularFireAuth) {
    console.log('Hello AuthFirebaseProvider Provider');
  }

  doLogin(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userCred => resolve(userCred))
      .catch(error => {
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/invalid-email':
            reject ('USER_NOT_FOUND');
            break;
          case 'auth/wrong-password':
            reject ('WRONG_PASSWORD');
            break;
          case 'auth/user-disabled':
            reject ('BLOCKED_USER');
            break;
          default:
            reject (error.code);
        }
      });
    });
  }

  doRegister(email: string, password: string): Promise<any> {
    return new Promise ((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userCred => resolve(userCred))
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            reject ('INVALID_EMAIL');
            break;
          default:
            reject (error.code);
        }
      });
    })
  }

  doLogout(): Promise<void>{
    return this.fireAuth.auth.signOut();
  }

  isLoggedIn(): boolean {
    return this.fireAuth.auth.currentUser !== null;
  }

  getCurrentUser() {
    return this.fireAuth.auth.currentUser
  }

}
