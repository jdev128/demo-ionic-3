import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RandomUserServiceResponse } from './random-user-service-interfaces';

/*
  Generated class for the RandomUserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RandomUserServiceProvider {

  API_URL: string = "https://randomuser.me/api/?results=25&nat=es";
  data = [];

  constructor(public http: HttpClient) {
  }

  getUsers() {
    return this.http.get<RandomUserServiceResponse>(this.API_URL).pipe(map( resp => resp.results));
  }

  }
