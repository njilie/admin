import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-newmenu',
  templateUrl: './newmenu.component.html',
  styleUrls: ['./newmenu.component.css']
})
export class NewmenuComponent implements OnInit {

  menuForm: FormGroup;
  submitted = false;
  clickSubmit = false;
  
  constructor(private formBuilder: FormBuilder, 
    private adminService: AdminService,
    private router: Router
    ) {
    this.menuForm = this.formBuilder.group({
      label: ['', Validators.required],
      priceDF: ['', Validators.required],
      category: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  valider(){
    this.clickSubmit = true;
  }

  onSubmit(){
    if (this.menuForm.valid) {
      this.adminService.saveMenus(this.menuForm.value).subscribe(
        (data) => {
          this.router.navigate([`/admin/menus`]);
        },
        (error) => {
          console.log(error);
          if (error.error.status === 400) {
            console.log("Votre menu n'est pas valide");
          }
          if (error.error.status === 401) {
          console.log("Vous n'êtes pas connecté ou n'avez pas le droit");
          }
        }
      );
    }
  }

}
