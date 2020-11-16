import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Image } from '../shared/interfaces/image';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;
  profilePicture: Image;
  registrationDate: number[];
  form: FormGroup;

  constructor(private auth: AuthService, private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.user = this.auth.userLogged();
    // console.log(this.auth.userLogged());
    // console.log(this.auth.userLoggedRoles());
    // console.log(this.auth.tokenGetter());

    // this.registrationDate = this.auth.userLogged().registrationDate as number[];
    // this.registrationDate.forEach(element => {
    //   console.log(element);
    // });

    this.userImage(this.user.id)

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

    // Validators.compose([
    //   Validators.required,
    //   Validators.minLength(4)
    // ])
  }

  userImage(userId: number): void {
    this.userService.userImage(userId).subscribe(
      (data) => {
        console.log(data);
        this.profilePicture = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.user.sex = +this.form.get('sex').value;

      // if (this.form.get('password').value && this.form.value.password) {
      //   this.user.password = this.form.get('password').value;
      // } else {
      //   delete this.form.value.password;
      // }

      this.userService.update(this.user.id, this.form.value).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
