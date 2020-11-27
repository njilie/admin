import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../shared/services/menu.service';
import { MenuOUT } from '../../../shared/interfaces/menu';
import { ImageOUT } from '../../../shared/interfaces/image';

@Component({
  selector: 'app-weekly-menus',
  templateUrl: './weekly-menus.component.html',
  styleUrls: ['./weekly-menus.component.css'],
})
export class WeeklyMenusComponent implements OnInit {

  menus!: MenuOUT[];
  menusImages: ImageOUT[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getMenusForThisWeek();
  }

  getMenusForThisWeek(): void {
    this.menuService.getMenusForThisWeek().subscribe(
      (menus) => {
        this.menus = menus;
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
