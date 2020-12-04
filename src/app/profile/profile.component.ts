import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../shared/services/user.service';

import { User /*UserOUT, UserIN*/ } from '../shared/interfaces/user';
import { ImageOUT, ImageIN } from '../shared/interfaces/image';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User /*UserOUT*/;
  profilePicture: ImageOUT;
  newProfilePicture: ImageIN;
  registrationDate: number[];
  form: FormGroup;
  loading: boolean;
  showBtnSavePic = false;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) {}

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
      postalCode: [
        '',
        Validators.compose([
          Validators.pattern('[0-9]+'),
          Validators.minLength(5),
          Validators.maxLength(5)
        ])
      ],
      email: ['', Validators.required],
      password: [''],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      phone: [
        '',
        Validators.compose([
          Validators.pattern('[0-9]+'),
          Validators.minLength(10),
          Validators.maxLength(10)
        ])
      ],
      town: [''],
      sex: ['', Validators.required],
    });

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
      if (confirm('Etes-vous sûr de vouloir modifier vos informations ?')) {
        this.loading = true;

        this.user.sex = +this.form.get('sex').value;

        // if (this.form.get('password').value && this.form.value.password) {
        //   this.user.password = this.form.get('password').value;
        // } else {
        //   delete this.form.value.password;
        // }

        this.userService.update(this.user.id, this.form.value).subscribe(
          (data) => {
            localStorage.setItem('userChangedValues', JSON.stringify(data));
            this.user = data;
            this.loading = false;
            alert('Informations mofifiées succès');
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  convertBase64(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.newProfilePicture = {
        image64: reader.result as string,
        imagePath: this.form.get('imagePath').value
      };
      this.user.image = this.newProfilePicture;
      console.log(this.newProfilePicture);
      console.log(this.user);
      this.showBtnSavePic = true;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  saveProfilePicture(): void {
    if (confirm('Etes-vous sûr de vouloir changer de photo de profil ?')) {
      this.userService.updateImage(this.user.id, this.newProfilePicture).subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('userChangedValues', JSON.stringify(data));
          alert('Photo de profil mofifiées succès');
          this.showBtnSavePic = false;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
