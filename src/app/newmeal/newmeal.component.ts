import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-newmeal',
  templateUrl: './newmeal.component.html',
  styleUrls: ['./newmeal.component.css']
})
export class NewmealComponent implements OnInit {

  newmeal: FormGroup;
  submitted = false;
  clickSubmit = false;

  constructor(private formBuilder: FormBuilder, 
    private adminService: AdminService,
    private router: Router
    ) {
    this.newmeal = this.formBuilder.group({
      label: ['', Validators.required],
      priceDF: ['', Validators.required],
      category: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.newmeal.valid) {
      this.adminService.saveMeals(this.newmeal.value).subscribe(
        (data) => {
          this.router.navigate([`/admin/meals`]);
        },
        (error) => {
          console.log(error);
          if (error.error.status === 400) {
            console.log("Votre plat n'est pas valide");
          }
          if (error.error.status === 401) {
          console.log("Vous n'êtes pas connecté ou n'avez pas le droit");
          }
        }
      );
    }
  }
  valider(){
    this.clickSubmit = true;
  }
}