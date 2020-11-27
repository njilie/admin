import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../shared/services/user.service';

import { User /*UserOUT, UserIN*/ } from '../shared/interfaces/user';
import { ImageOUT } from '../shared/interfaces/image';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User /*UserOUT*/;
  profilePicture: ImageOUT;
  registrationDate: number[];
  form: FormGroup;

  constructor(private auth: AuthService, private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    if (localStorage.getItem('userChangedValues')) {
      this.user = JSON. parse(localStorage.getItem('userChangedValues'));
    }
    else {
      this.user = this.auth.userLogged();
    }
    // console.log(this.auth.userLogged());
    // console.log(this.auth.userLoggedRoles());
    // console.log(this.auth.tokenGetter());

    // this.registrationDate = this.auth.userLogged().registrationDate as number[];
    // this.registrationDate.forEach(element => {
    //   console.log(element);
    // });

    this.userImage(this.user.id);

    this.form = this.fb.group({
      imagePath: [''],
      address: [''],
      postalCode: ['', Validators.minLength(5)],
      email: ['', Validators.required],
      password: [''],
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

    console.log(this.user);
  }

  userImage(userId: number): void {
    this.userService.userImage(userId).subscribe(
      (data) => {
        this.profilePicture = data;
        console.log(this.profilePicture);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.user.sex = +this.form.get('sex').value;
      this.profilePicture.imagePath = this.form.get('imagePath').value;

      // if (this.form.get('password').value && this.form.value.password) {
      //   this.user.password = this.form.get('password').value;
      // } else {
      //   delete this.form.value.password;
      // }

      this.userService.updateImage(this.user.id, this.profilePicture).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );

      this.userService.update(this.user.id, this.form.value).subscribe(
        (data) => {
          localStorage.setItem('userChangedValues', JSON.stringify(data));
          this.user = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  convertBase64(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.profilePicture.image64 = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
}
