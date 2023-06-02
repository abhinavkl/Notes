import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseMessage } from 'src/app/shared/response-message.model';
import { AuthService } from '../auth.service';
import { Login } from './login.model';
import { NavMenuService } from 'src/app/nav-menu/nav-menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  responseMessage=ResponseMessage.default;
  loginForm:FormGroup=new FormGroup({})

  showEmailValidators = false;
  showPasswordValidators=false;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private navmenuService:NavMenuService
  ){}


  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email: ['', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }],
      password:['',{
        validators:[Validators.required],
        updateOn:'blur'
      }],
      rememberme:[false]
    })
  }

  onSubmit(){
    let login=new Login(
      this.loginForm.get('email')!.value,
      this.loginForm.get('password')!.value,
      this.loginForm.get('rememberme')!.value
    )
    
    this.authService.loginUser(login).subscribe(response=>{
      this.responseMessage=response;
      if(this.responseMessage.statusCode===1){
        this.authService.setIsAuthenticate(true)
        this.navmenuService.updateTimeLeft(environment.SessionTimeS)
        setTimeout(()=>{
          this.router.navigate(['/'])
        },1000)
      }
    })

  }

}
