import { AbstractControl } from "@angular/forms";
import { ZoneValidator } from "./longueur-minimum.component";

describe('longueur zone Validator',()=>{


    it('#7 Une chaine avex 10 espaces est invalide',()=>{
        let validator=ZoneValidator.longueurMinimum(3);
        let control={value:' '.repeat(10)};
        let result=validator(control as AbstractControl); 

        expect(result['nbreCaractereInsufisant']).toBe(true);
    });
    it('#8 Une phrase avec des mots valide ',()=>{
        let validator=ZoneValidator.longueurMinimum(3);
        let control={value:'Vive Angular'};
        let result=validator(control as AbstractControl); 

        expect(result).toBe(null);
    });
    it('#9 Une phrase avec 3 espaces des mots et ensuit 3 espaces est valide',()=>{
        let validator=ZoneValidator.longueurMinimum(3);
        let control={value:' je le veux   '};
        let result=validator(control as AbstractControl); 

        expect(result).toBe(null);
    });

    it('#10 Une phrase avec 1 espace et 2 caractère est invalide',()=>{
        let validator=ZoneValidator.longueurMinimum(3);
        let control={value:' xx'};
        let result=validator(control as AbstractControl); 

        expect(result['nbreCaractereInsufisant']).toBe(true);
    });
    it('#11 Une phrase avec 2 espace et 1 caracter est invalide ',()=>{
        let validator=ZoneValidator.longueurMinimum(3);
        let control={value:'  x'};
        let result=validator(control as AbstractControl); 

        expect(result['nbreCaractereInsufisant']).toBe(true);
    });
    it('#12 Une phrase avec 3 espaces et 3 caracteres est valide',()=>{
        let validator=ZoneValidator.longueurMinimum(3);
        let control={value:'   xxx'};
        let result=validator(control as AbstractControl); 

        expect(result).toBe(null);
    });
    it('#13 Une phrase avec 5 espaces ,5 caracters et 5 espaces est valide',()=>{
        let validator=ZoneValidator.longueurMinimum(3);
        let control={value:'     xxxxx     '};
        let result=validator(control as AbstractControl); 

        expect(result).toBe(null);
    });
    it('#14 une chaine nulle est invalide',()=>{
        let validator=ZoneValidator.longueurMinimum(3);
        let control={value:' '.repeat(10)};
        let result=validator(control as AbstractControl); 

        expect(result['nbreCaractereInsufisant']).toBe(true);
    });
    
});