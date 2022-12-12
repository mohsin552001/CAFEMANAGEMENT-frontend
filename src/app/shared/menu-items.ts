import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  icon: string;
  role: string;
}

var MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
  { state: 'catagory', name: 'Manage catagory', icon: 'category', role: 'admin' },
  { state: 'product', name: 'Manage Product', icon: 'inventory_2', role: 'admin' },
];

@Injectable()
export class MenuItems {
[x: string]: any|string;
  getMenuItem(): any {
    return MENUITEMS
  }
}
