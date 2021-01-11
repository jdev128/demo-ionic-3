import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RandomUserServiceProvider } from '../../providers/random-user-service/random-user-service';
import { User } from '../../providers/random-user-service/random-user-service-interfaces';
import { UserDetailPage } from '../user-detail/user-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users = [];

  constructor(private navCtrl: NavController, private userService: RandomUserServiceProvider) {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.error ("Se produjo un error al obtener los datos de los usuarios: ", error)
    );
  }

  showDetail (event: Event, user: User) {
    if (event) {
      event.stopPropagation();
    }
    this.navCtrl.push(UserDetailPage, {user: user});
  }

  doRefresh (refresher) {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.error ("Se produjo un error al obtener los datos de los usuarios: ", error),
      () => refresher.complete()
    );
  }

}
