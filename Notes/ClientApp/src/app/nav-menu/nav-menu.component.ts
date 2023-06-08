import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavMenuService } from '../services/nav-menu.service';
import { NoteService } from '../services/notes.service';
import { TagService } from '../services/tags.service';

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
    private noteService:NoteService,
    public navmenuService:NavMenuService,
    private tagService:TagService
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
      this.noteService.clear()
      this.navmenuService.clear()
      this.tagService.clear()
      this.router.navigate(['/auth/login'])
    })
  }
}
