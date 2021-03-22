import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ZoneValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
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

 
});
