import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule {
  name: string;
  id: number;
  address: string;
  age: number;
  contact: string;

  constructor(name: string, id: number, address: string, age: number, contact: string) {
    this.name = name;
    this.id = id;
    this.address = address;
    this.age = age;
    this.contact = contact;
  }
}
