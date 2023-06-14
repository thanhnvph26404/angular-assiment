import { Component, OnChanges, ChangeDetectorRef} from '@angular/core';

import {  Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-base-header',
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.scss']
})
export class BaseHeaderComponent implements OnChanges{
  
  isLoggedIn: boolean = false
  state: boolean = false
  user: any;

  constructor(private authService: AuthService, private router: Router, private crd: ChangeDetectorRef) {
   
  }
 ngOnChanges(){ 
  this.user = this.authService.getUser();
  this.isLoggedIn = this.authService.isAuth()
  this.crd.detectChanges()
}


  handleState(){
    if(this.state){
      this.state = false
    }else{
      this.state = true
    }
  }

  logout(){
    localStorage.removeItem('user')
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
