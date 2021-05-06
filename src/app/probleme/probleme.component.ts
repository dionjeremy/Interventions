import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';
import { Router } from '@angular/router';
import {ProblemeService} from './probleme.service';
import { emailMatcherValidator} from '../shared/email-matcher/email-matcher.component';
import { IProbleme } from './probleme';


@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProblemes: ITypeProbleme[];
  errorMessage:string;
  
  probleme:IProbleme;
  
  
  constructor(private fb: FormBuilder, private typeproblemeService: TypeproblemeService, private problemeService: ProblemeService, private route : Router) { }

  ngOnInit() {
    this.problemeForm=this.fb.group({
        prenom:['',[Validators.required,ZoneValidator.longueurMinimum(3),ZoneValidator.longueurMaximum(50)]],
        nom:['',[Validators.required,ZoneValidator.longueurMaximum(50)]],
        typeProbleme:[Validators.required],
        notification:['pasnotification'],
        //le groupe pour le courriel
        courrielGroup: this.fb.group({
          courriel: [{value:'', disabled:true}],
          courrielConfirmation: [{value:'', disabled: true}]

        }),

        telephone: [{value: '', disabled: true}],
        descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
        noUnite: [''],
        dateProbleme: {value: Date(), disabled: true}

        

  }),

    this.typeproblemeService.obtenirProblemes()
    .subscribe(cat => this.typesProblemes = cat,
               error => this.errorMessage = <any>error);  
    
    
    this.problemeForm.get('notification').valueChanges
    .subscribe(value=> this.appliquerNotifications(value));

  }

    save(): void {
      if (this.problemeForm.dirty && this.problemeForm.valid) {
          // Copy the form values over the problem object values
          this.probleme = this.problemeForm.value;
          this.probleme.id = 0;
          this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
          //this.probleme.dateProbleme = new Date();
          this.problemeService.saveProbleme(this.probleme)
              .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                  () => this.onSaveComplete(),  // Fonction callback
                  (error: any) => this.errorMessage = <any>error
              );
      } else if (!this.problemeForm.dirty) {
          this.onSaveComplete();
      }
    }
    
    onSaveComplete(): void { 
      // Reset the form to clear the flags
      this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
      this.route.navigate(['/accueil']);
    }
    

    

    appliquerNotifications(typeNotification: string): void {
      const courrielControl = this.problemeForm.get('courrielGroup.courriel');
      const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
      const telephoneControl = this.problemeForm.get('telephone');      
      const courrielGroup=this.problemeForm.get('courrielGroup');
      // Tous remettre à zéro
      courrielControl.clearValidators();
      courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
      courrielControl.disable();  
  
      courrielConfirmationControl.clearValidators();
      courrielConfirmationControl.reset();    
      courrielConfirmationControl.disable();

      telephoneControl.clearValidators();
      telephoneControl.reset();    
      telephoneControl.disable();
  
      if (typeNotification === 'courriel') {   
              courrielControl.setValidators([Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
              courrielControl.enable();  
              courrielConfirmationControl.setValidators([Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);              
              courrielConfirmationControl.enable();  
              courrielGroup.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);
                                 
      }else if(typeNotification==='telephone'){
          telephoneControl.setValidators([Validators.compose([Validators.required,Validators.pattern('[0-9]+'),Validators.minLength(10),Validators.maxLength(10)])]);              
          telephoneControl.enable(); 
        

      }
        
      courrielControl.updateValueAndValidity();   
      courrielConfirmationControl.updateValueAndValidity();   
      telephoneControl.updateValueAndValidity();     
      courrielGroup.updateValueAndValidity();
    }


  

}



