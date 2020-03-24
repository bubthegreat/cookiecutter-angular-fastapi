import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalStateService } from '../../services/global-state.service';


function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      // if control is empty return no error
      return null;
    }

    // test the value of the control against the regexp supplied
    const valid = regex.test(control.value);

    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? null : error;
  };
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  minEmailLen = 10;
  maxEmailLen = 128
  minPassLen = 8;

  requiredSpecialChars = /[.,\/#!$%\^&\*;:{}=\-_`~()]/
  requiredSpecialCharsString = ".,\/#!$%\^&\*;:{}=\-_`~()"

  minPassSpecRe = RegExp(this.requiredSpecialChars)

  loginForm = this.formBuilder.group({
    username: ['',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(this.minEmailLen),
        Validators.maxLength(this.maxEmailLen)
      ]
    ],
    password: ['',
      [
          // Validators.required,
          // Validators.minLength(this.minPassLen),
          // patternValidator(/\d/, {'minPassNum': true}),
          // patternValidator(/[.,\/#!$%\^&\*;:{}=\-_`~()]/, {'minPassSpec': true}),
          // patternValidator(/[A-Z]/, {'minPassUpper': true})
        ]
      ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private state: GlobalStateService,
    ) {}

  doLogin() {
    this.loginForm.updateValueAndValidity();
    if (this.loginForm.valid) {
      this.state.doLogin(this.loginForm.value);
      this.router.navigate(['/']);
    }
    else {
      this.username.markAsDirty();
      this.username.markAsTouched();
      this.password.markAsDirty();
      this.password.markAsTouched();
      this.loginForm.updateValueAndValidity();
    }
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

}

