import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../shared/services/menu.service';
import { Menu } from '../../../shared/interfaces/menu';
import { Image } from '../../../shared/interfaces/image';

@Component({
  selector: 'app-weekly-menus',
  templateUrl: './weekly-menus.component.html',
  styleUrls: ['./weekly-menus.component.css'],
})
export class WeeklyMenusComponent implements OnInit {
  menus!: Menu[];
  menusImages: Image[] = [];

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
