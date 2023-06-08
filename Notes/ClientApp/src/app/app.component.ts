import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { NavMenuService } from './services/nav-menu.service';
import { NoteService } from './services/notes.service';
import { TagService } from './services/tags.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private authService:AuthService,
    private navmenuService:NavMenuService,
    private noteService:NoteService,
    private tagService:TagService
  ) {}

  ngOnInit(): void {
    this.authService.getUserSession().subscribe(response=>{
        if(response.isAuthenticated) {
          sessionStorage.setItem('isAuthenticated','true')
          sessionStorage.setItem('claims',JSON.stringify(response.user.claims))
          sessionStorage.setItem('roles',JSON.stringify(response.user.roles))
  
          this.authService.isAuthenticated=true;
          this.authService.userDetails.next(response.user)
          this.navmenuService.updateTimeLeft(response.expiresIn)
        }
        else{
          this.navmenuService.clear()
          this.authService.clear()          
          this.noteService.clear()
          this.tagService.clear()
        }
    })
  }
}
