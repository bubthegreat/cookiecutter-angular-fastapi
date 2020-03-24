import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalStateService } from '../../services/global-state.service';
import { MatSnackBar } from '@angular/material';


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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  minEmailLen = 10;
  maxEmailLen = 128
  minPassLen = 8;

  requiredSpecialChars = /[.,\/#!$%\^&\*;:{}=\-_`~()]/
  requiredSpecialCharsString = ".,\/#!$%\^&\*;:{}=\-_`~()"

  minPassSpecRe = RegExp(this.requiredSpecialChars)

  registrationForm = this.getRegistrationForm();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private state: GlobalStateService,
    private _snackBar: MatSnackBar
    ) {}

  getRegistrationForm() {
    return this.formBuilder.group({
      username: ['',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(this.minEmailLen),
          Validators.maxLength(this.maxEmailLen)
        ]
      ],
      password1: ['',
        [
            Validators.required,
            Validators.minLength(this.minPassLen),
            patternValidator(/\d/, {'minPassNum': true}),
            patternValidator(/[.,\/#!$%\^&\*;:{}=\-_`~()]/, {'minPassSpec': true}),
            patternValidator(/[A-Z]/, {'minPassUpper': true})
          ]
        ],
        password2: ['',
          [
              Validators.required,
              Validators.minLength(this.minPassLen),
              patternValidator(/\d/, {'minPassNum': true}),
              patternValidator(/[.,\/#!$%\^&\*;:{}=\-_`~()]/, {'minPassSpec': true}),
              patternValidator(/[A-Z]/, {'minPassUpper': true}),
              this.passwordMatcher.bind(this)
            ]
          ]
    });
  }

  private passwordMatcher() {
    if (
        this.registrationForm &&
        this.registrationForm.get('password1') &&
        this.registrationForm.get('password2')
    ) {
      let p1control = this.registrationForm.get('password1')
      let p2control = this.registrationForm.get('password2')
      if (p1control.value != p2control.value) {
        return { passwordsNoMatchy: true }
      }
    }
    return null;
}

  doRegister() {
    this.registrationForm.updateValueAndValidity();
    if (this.registrationForm.valid) {
      this.state.doRegister(this.username.value, this.password1.value);
      this.router.navigate(['/']);
      this._snackBar.open(
        "Thanks for registering!  Please log in",
        "Dismiss", {
          duration: 5000,
          verticalPosition: 'top'
        }
      );
    }
    else {
      this.username.markAsDirty();
      this.username.markAsTouched();
      this.password1.markAsDirty();
      this.password1.markAsTouched();
      this.password2.markAsDirty();
      this.password2.markAsTouched();
      this.registrationForm.updateValueAndValidity();
    }
  }

  get username() {
    return this.registrationForm.get('username') as FormControl;
  }

  get password1() {
    return this.registrationForm.get('password1') as FormControl;
  }

  get password2() {
    return this.registrationForm.get('password2') as FormControl;
  }

}

