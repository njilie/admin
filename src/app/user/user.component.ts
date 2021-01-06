import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from '../shared/services/admin.service';
import { UserService } from '../shared/services/user.service';
import { User, UserOUT } from '../shared/interfaces/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any;
  paramId: Params;
  users: Array<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.listUser();
    this.route.params
    .subscribe(
      (params: Params) => {
        this.paramId = params['id'];
        this.get(+this.paramId)
      })
  }


  listUser(): void{
    this.adminService.listUser()
    .subscribe((data: Array<UserOUT>) => {
      console.log(data)
      this.users = data; 
    })
  }

  get(id: number): void {
    this.adminService.get(id)
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
    this.adminService.update(this.user.id, this.user)
    .subscribe((data)=> {console.log(data)
      this.router.navigate(['/admin/users']);
    });
    
  }

}









  