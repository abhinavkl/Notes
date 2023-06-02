import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './components/auth/auth.service';
import { NavMenuService } from './nav-menu/nav-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private authService:AuthService,
    private navmenuService:NavMenuService  
  ) {}

  ngOnInit(): void {
    this.authService.getUserSession().subscribe(data=>{
        if(data.isAuthenticated){
          this.authService.setIsAuthenticate(true)
          this.authService.userDetails=data.user
          this.navmenuService.updateTimeLeft(data.expiresIn)
        }
        else{
          this.authService.clearSessionTimers()
        }
    })
  }
}
