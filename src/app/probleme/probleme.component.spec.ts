import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ZoneValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';
import {emailMatcherValidator} from '../shared/email-matcher/email-matcher.component'


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
  it("#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courrie",()=>{
    component.appliquerNotifications('courriel');
    let zone=component.problemeForm.get('courrielGroup.courrielConfirmation');

    expect(zone.status).toEqual('INVALID');
  });
  it(" #24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme",()=>{
    component.appliquerNotifications('courriel');
    let zone=component.problemeForm.get('courrielGroup.courriel');
    let group=component.problemeForm.get('courrielGroup');
    let errors={};
    zone.setValue("");
    errors=group.errors||{};
    expect(zone.status).toEqual('INVALID');
    
  });
  it("#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null ",()=>{
    let zoneConfirmation=component.problemeForm.get('courrielGroup.courrielConfirmation'); 
    let zoneCourriel=component.problemeForm.get('courrielGroup.courriel');
    let group=component.problemeForm.get('courrielGroup');
    let errors={};
    
    zoneCourriel.setValue("");
    zoneConfirmation.setValue("dionjeremy@gmail.com");
    let result=emailMatcherValidator.courrielDifferents(); 

    expect(result).toBe(null);
  });
  it("#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null ",()=>{

  });
  it("#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifierpar courriel ",()=>{

  });
  it("#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel ",()=>{

  });
});
function courrielDifferents() {
  throw new Error('Function not implemented.');
}

