import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-manager-menu',
  templateUrl: './manager-menu.component.html',
  styleUrls: ['./manager-menu.component.css']
})
export class ManagerMenuComponent implements OnInit {

  menu: any;
  paramId: Params;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.paramId = params['id'];
        this.get(+this.paramId)
      });
  }

  get(id: number): void {
    this.adminService.getMenu(id)
    .subscribe((data: any) => {
      this.menu = data;
    })
  }

  onSubmit(): void{
    if (this.menu.id === 0){
      this.menu.push(this.menu)
      }  
  }

  onClick(): void {
    this.adminService.updateMenu(this.menu.id, this.menu)
    .subscribe((data)=> {
      this.router.navigate(['/admin/menus']);
    });
    
  }

}
