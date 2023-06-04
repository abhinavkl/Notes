import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/directives/custom-validator.directive';
import { AuthService } from '../../../services/auth.service';
import { Register } from './register.model';
import { ResponseMessage } from 'src/app/shared/response-message.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  responseMessage:ResponseMessage=new ResponseMessage();
  registerForm: FormGroup = new FormGroup({});
  passwordValidator: RegExp = /^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
  nameValidator: RegExp = /^[A-Z][a-zA-Z ]+$/;

  showFNameValidators = false;
  showLNameValidators = false;
  showEmailValidators = false;
  showPasswordValidators = false;
  showConfirmPasswordValidators = false;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private authService: AuthService, 
    private customValidators: CustomValidators) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', {
        validators: [Validators.required, Validators.pattern(this.nameValidator)],
        updateOn: 'change'
      }],
      lastname: ['', {
        validators: [Validators.required, Validators.pattern(this.nameValidator)],
        updateOn: 'change'
      }],
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.customValidators.uniqueEmailValidator()],
        updateOn: 'blur'
      }],
      password: ['', {
        validators: [Validators.required, Validators.pattern(this.passwordValidator)],
        updateOn: 'change'
      }],
      confirmpassword: ['', {
        validators: [Validators.required, Validators.pattern(this.passwordValidator)],
        updateOn: 'change'
      }]
    })
  }

  onSubmit() {
    let register = new Register(
      this.registerForm.get('firstname')!.value,
      this.registerForm.get('lastname')!.value,
      this.registerForm.get('email')!.value,
      this.registerForm.get('password')!.value,
      this.registerForm.get('confirmpassword')!.value
    );
    this.authService.registerUser(register).subscribe(response=>{
      this.responseMessage=response;
      if(this.responseMessage.statusCode===1){
        setTimeout(()=>{
          this.router.navigate(['/auth/login'])
        },1000)
      }
    })
  }
}
