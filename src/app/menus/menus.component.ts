import { Component, OnInit } from '@angular/core';
import { MenuOUT } from '../shared/interfaces/menu';
import { MenuService } from '../shared/services/menu.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  menus: Array<MenuOUT>;
  menu: any;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.listMenu();
  }

  listMenu(): void{
    this.menuService.listMenu()
    .subscribe((data: Array<MenuOUT>) => {
      console.log(data)
      this.menus = data; 
    })
  }
  
}
