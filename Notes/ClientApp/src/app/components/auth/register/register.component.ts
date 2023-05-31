import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm:FormGroup;
  passwordValidator:RegExp=/^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
  
  showEmailValidators=false;
  showPasswordValidators=false;
  showConfirmPasswordValidators=false;

  constructor(private fb:FormBuilder){
    this.registerForm=this.fb.group({
      email:['',{
        validators:[Validators.email,Validators.required],
        updateOn:'change'
      }],
      password:['',{
        validators:[Validators.required,Validators.pattern(this.passwordValidator)],
        updateOn:'change'
      }],
      confirmpassword:['',{
        validators:[Validators.required,Validators.pattern(this.passwordValidator)],
        updateOn:'change'
      }]
    })
  }
  
  ngOnInit(): void {    
  }

  onSubmit(){
    console.log(this.registerForm)
  }
}
