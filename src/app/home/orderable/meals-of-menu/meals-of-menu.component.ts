import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { Menu } from 'src/app/shared/interfaces/menu';
import { Image } from 'src/app/shared/interfaces/image';

@Component({
  selector: 'app-meals-of-menu',
  templateUrl: './meals-of-menu.component.html',
  styleUrls: ['./meals-of-menu.component.css']
})
export class MealsOfMenuComponent implements OnInit {
  menu!: Menu;
  menuId!: number;
  menusImages!: Image[];

  constructor(private menuService: MenuService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.menuId = +params.get('id');
    });

    this.getMenu(this.menuId);
  }

  getMenu(menuId: number): void {
    this.menuService.getMenu(menuId).subscribe(
      (menu) => {
        console.log(menu);
        this.menu = menu;
        // this.menus.forEach((menu) => {
        //   this.menuService.getMenuImage(menu.imageId).subscribe(
        //     (image) => {
        //       this.menusImages.push(image);
        //     },
        //     (error) => {
        //       console.log(error);
        //     }
        //   );
        // });
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
