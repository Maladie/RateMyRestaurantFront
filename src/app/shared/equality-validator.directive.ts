import { Directive, Attribute } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Validator } from '@angular/forms/src/directives/validators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validateEqual][formControlName]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualityValidatorDirective, multi: true }]
})
export class EqualityValidatorDirective implements Validator {

  constructor( @Attribute('validateEqual') public validateEqual: string,
    @Attribute('reverse') public reverse: string) { }

  private get isReverse() {
    if (!this.reverse) { return false; }
    return this.reverse === 'true' ? true : false;
  }
  validate(control: AbstractControl): { [key: string]: any } {

    const v = control.value;

    // control value (e.g. password)
    const e = control.root.get(this.validateEqual);

    // value not equal
    if (e && v !== e.value && !this.isReverse) {
      return {
        validateEqual: true
      };
    }

    // value equal and reverse
    if (e && v === e.value && this.isReverse) {
      delete e.errors['validateEqual'];
      if (!Object.keys(e.errors).length) {
        e.setErrors(null);
      }
    }

    // value not equal and reverse
    if (e && v !== e.value && this.isReverse) {
      e.setErrors({ validateEqual: true });
    }

    return null;
  }

}
