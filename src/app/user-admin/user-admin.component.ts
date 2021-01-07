import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from '../shared/services/admin.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/interfaces/user';


@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  user: any;
  paramId: Params;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.paramId = params['id'];
        this.get(+this.paramId)
      })
      
  }

  get(id: number): void {
    this.adminService.getMeal(id)
    .subscribe((data: any) => {
      this.user = data;
    })
  }

  onSubmit(): void{
    if (this.user.id === 0){
      this.user.push(this.user)
      }  
  }

  onClick(): void {
    this.adminService.updateMeal(this.user.id, this.user)
    .subscribe((data)=> {console.log(data)
      this.router.navigate(['/admin/users']);
    });
    
  }

}
