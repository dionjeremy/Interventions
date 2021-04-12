import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { repeat } from 'rxjs/operators';
import { ZoneValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';



describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypeproblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#1 zone Prénom invalide avec 2 caractères',()=>{
    let zone=component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });


  it('#2 Zone prénom valide avec 3 caractères',()=>{
    let zone=component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });


  it('#3 Zone prénom valide avec 200 caractères',()=>{
    let zone=component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });


  
  it('#4 Zone prénom invalide avec aucune valeur ',()=>{
    let zone=component.problemeForm.controls['prenom'];
    zone.setValue('');
    expect(zone.valid).toBeFalsy();
  });

  

  it('#5 Zone prénom invalide avec 10 espaces ',()=>{
    let zone=component.problemeForm.controls['prenom']
    zone.setValue(' '.repeat(10));
    let validator=ZoneValidator.longueurMinimum(3);
    let control={value:zone.value};
    let result=validator(control as AbstractControl); 

    expect(result['nbreCaractereInsufisant']).toBe(true);
  });


  it('#6 Zone prénom invalide avec 2 espaces et 1 caractère ',()=>{
    let zone=component.problemeForm.get('prenom')
    zone.setValue('  x');
    let validator=ZoneValidator.longueurMinimum(3);
    let control={value:zone.value};
    let result=validator(control as AbstractControl); 

    expect(result['nbreCaractereInsufisant']).toBe(true);
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier',()=>{
    component.appliquerNotifications('nePasNotifier');
    let zone =component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#16| Zone TELEPHONE est vide quand ne pas me notifier',()=>{
    component.appliquerNotifications('nePasNotifier');
    let zone =component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier',()=>{
    component.appliquerNotifications('nePasNotifier');
    let zone =component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier',()=>{
    component.appliquerNotifications('nePasNotifier');
    let zone =component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });
 
  it("#19 | Zone TELEPHONE est désactivée quand notifier par courriel",()=>{
    component.appliquerNotifications('courriel');
    let zone=component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });
  it("#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel ",()=>{
    component.appliquerNotifications('courriel');
    let zone=component.problemeForm.get('courrielGroup.courriel');
    
    expect(zone.status).not.toEqual('DISABLED');
  });
  it("#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel",()=>{
    component.appliquerNotifications('courriel');
    let zone=component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).not.toEqual('DISABLED');

  });
  it("#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel",()=>{
    component.appliquerNotifications('courriel');
    let zone=component.problemeForm.get('courrielGroup.courriel');
    
    expect(zone.status).toEqual('INVALID');
  });
  it("#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel",()=>{
    component.appliquerNotifications('courriel');
    let zone=component.problemeForm.get('courrielGroup.courrielConfirmation');

    expect(zone.status).toEqual('INVALID');
  });
  it(" #24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme",()=>{
    component.appliquerNotifications('courriel');
    let zone=component.problemeForm.get('courrielGroup.courriel');
    
    zone.setValue("");
    
    expect(zone.status).toEqual('INVALID');
    
  });
  it("#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null ",()=>{
    component.appliquerNotifications('courriel');
    let errors={};
    let group=component.problemeForm.get('courrielGroup');
    let courrielConfirmation=component.problemeForm.get('courrielGroup.courrielConfirmation');
    courrielConfirmation.setValue("dionjeremy7@gmail.com");

    errors=group.errors||{};
    expect(errors['courrielInvalide']).toBeUndefined();
    
    
  });
  it("#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null ",()=>{
    component.appliquerNotifications('courriel');
    let errors={};
    let group=component.problemeForm.get('courrielGroup');
    let courrielConfirmation=component.problemeForm.get('courrielGroup.courrielConfirmation');
    let courriel=component.problemeForm.get('courrielGroup.courriel');
    courrielConfirmation.setValue("dionjeremy7@gmail.com");
    courriel.setValue("");

    errors=group.errors||{};
    expect(errors['courrielInvalide']).toBeUndefined();
  });
  it("#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel ",()=>{
   component.appliquerNotifications('courriel');
   let courriel=component.problemeForm.get('courrielGroup.courriel');
   let courrielConfirmation=component.problemeForm.get('courrielGroup.courrielConfirmation');
   let groupe=component.problemeForm.get('courrielGroup');
   courriel.setValue('A@C');
   courrielConfirmation.setValue('B@A');

    expect(groupe.status).toEqual('INVALID');
  });
  it("#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel ",()=>{
    component.appliquerNotifications('courriel');
    let courriel=component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation=component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupe=component.problemeForm.get('courrielGroup');
    courriel.setValue('dionjeremy7@gmail.com');
    courrielConfirmation.setValue('dionjeremy7@gmail.com');
     expect(groupe.status).toEqual('VALID');
  });
  it("#29 | Zone TELEPHONE est activée quand notifier par messagerie texte",()=>{
   component.appliquerNotifications('telephone');
   let zone=component.problemeForm.get('telephone');
   expect(zone.enabled).toBeTrue();
  });
  it("#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte ",()=>{
    component.appliquerNotifications('telephone');
    let zone=component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toBe('DISABLED');
  });
  it("#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte ",()=>{
    component.appliquerNotifications('telephone');
    let zone=component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toBe('DISABLED');
  });
  it("#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte",()=>{
    component.appliquerNotifications('telephone');
    let zone=component.problemeForm.get('telephone');
    expect(zone.status).toBe('INVALID');
  });
  it("#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte",()=>{
    component.appliquerNotifications('telephone');
    let zone=component.problemeForm.get('telephone');
    zone.setValue('A');
    expect(zone.status).toBe('INVALID');
  });
  it("#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte",()=>{
    component.appliquerNotifications('telephone');
    let zone=component.problemeForm.get('telephone');
    zone.setValue('1'.repeat(9));

    expect(zone.status).toBe('INVALID');
  });
  it("#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte ",()=>{
    component.appliquerNotifications('telephone');
    let zone=component.problemeForm.get('telephone');
    zone.setValue('1'.repeat(11));

    expect(zone.status).toBe('INVALID');
  });
  it("#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte ",()=>{
    component.appliquerNotifications('telephone');
    let zone=component.problemeForm.get('telephone');
    zone.setValue('1'.repeat(10));

    expect(zone.status).toBe('VALID');
  });


});


