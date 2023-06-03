import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../components/services/auth.service';
import { NavMenuService } from '../components/services/nav-menu.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(
    public router:Router,
    public authService:AuthService,
    public navmenuService:NavMenuService
  ){}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout(){
    this.authService.logout().subscribe(()=>{
      this.authService.clear()
    })
  }
}
