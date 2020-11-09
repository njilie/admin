import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { User } from '../shared/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  registrationDate: number[];
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.userLogged();
    console.log(this.auth.userLogged());
    console.log(this.auth.userLoggedRoles());
    console.log(this.auth.tokenGetter());

    // this.registrationDate = this.auth.userLogged().registrationDate as number[];
    // this.registrationDate.forEach(element => {
    //   console.log(element);
    // });

  }

}
