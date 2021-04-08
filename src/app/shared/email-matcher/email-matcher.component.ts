import { AbstractControl, ValidatorFn } from '@angular/forms';
export class emailMatcherValidator {


 static courrielDifferents(): ValidatorFn {
   
   return (c: AbstractControl): { [key: string]: boolean } | null => {
    let pattern= new RegExp ('[a-z0-9._%+-]+@[a-z0-9.-]+');
    
    
    if(pattern.test(c['controls'].courrielGroup.courriel.value)===false){
      return{'courrielInvalide':true};
    }
   if(pattern.test(c['controls'].courrielGroup.courrielConfirmation.value)===false){
      return{'courrielInvalide':true};
    }

    if (!c['controls'].courrielGroup.courriel.value || !c['controls'].courrielGroup.courrielConfirmation.value){
     return null;
   
    }
 

   return c['controls'].courrielGroup.courriel.value ===c['controls'].courrielGroup.courrielConfirmation.value ? null : { match: true };

   };
 }
} 