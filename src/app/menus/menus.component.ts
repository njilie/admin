import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuOUT } from '../shared/interfaces/menu';
import { AdminService } from '../shared/services/admin.service';
import { MenuService } from '../shared/services/menu.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  menus: Array<MenuOUT>;
  menu: any;


  constructor(private menuService: MenuService,
    private adminService: AdminService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.listMenu();
  }

  listMenu(): void{
    this.menuService.listMenu()
    .subscribe((data: Array<MenuOUT>) => {
      this.menus = data; 
    })
  }

  onDelete(id:number){
    this.adminService.delete(id).then(()=>{
      this.menus = this.menus.filter(meal=>meal.id!=id);
    })
  }
  
}
