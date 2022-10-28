import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Res {
  data: Employee[];
  page: Number;
}
export class Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    avatar: string
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.avatar = avatar;
  }
}

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  public getUsers(num: Number) {
    return this.http.get<Res>('https://reqres.in/api/users?page=' + num);
  }
}
