import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  submitted: boolean = false;
  formSignin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private auth: AuthService,private router: Router) {

  }

  onHandleSubmit() {
    
    
    
    this.submitted = true;
    if (this.formSignin.valid) {
      

      this.auth.signin(this.formSignin.value).subscribe(data => {
        localStorage.setItem('user', JSON.stringify(data))
        this.router.navigate(['/'])
      });
      
    }
  }
}
