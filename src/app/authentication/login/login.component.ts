import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.authService.login(this.userForm.value);
    }
  }

}
