import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { User } from '../shared/interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;
  registrationDate: number[];
  form: FormGroup;
  sex: string;

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.user = this.auth.userLogged();
    // console.log(this.auth.userLogged());
    // console.log(this.auth.userLoggedRoles());
    // console.log(this.auth.tokenGetter());

    // this.registrationDate = this.auth.userLogged().registrationDate as number[];
    // this.registrationDate.forEach(element => {
    //   console.log(element);
    // });

    switch (this.user.sex) {
      case 0: {
        this.sex = 'Homme';
        break;
      }
      case 1: {
        this.sex = 'Femme';
        break;
      }
      case 2: {
        this.sex = 'Autre';
        break;
      }
    }

    this.form = this.fb.group({
      address: [''],
      postalCode: ['', Validators.minLength(5)],
      email: ['', Validators.required],
      // password: [''],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      phone: [''],
      town: [''],
      sex: ['', Validators.required],
    });

    // this.form.get('sex').setValue(this.sex);

    // Validators.compose([
    //   Validators.required,
    //   Validators.minLength(4)
    // ])
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      console.log(+this.form.get('sex').value);
    }
  }
}
