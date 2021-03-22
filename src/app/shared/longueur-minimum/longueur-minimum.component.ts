import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ZoneValidator{
    static longueurMinimum(longueur :number ):ValidatorFn {
       
       
        return(valeurControle:AbstractControl):{[key:string]:boolean}|null=>{
            if(valeurControle.value.trim().length<longueur){
                return{'nbreCaractereInsufisant':true};
            }
            if(valeurControle==null){
                return{'nbreCaractereInsufisant':true};
            }
            return null;
        };

        
    }
}