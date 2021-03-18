import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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
    let zone=component.problemForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it('#1 zone Prénom invalide avec 2 caractères',()=>{
    let errors={};
    let zone=component.problemForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    errors=zone.errors||{};
    expect(errors['minLength']).toBeFalsy();
  });

  it('#2 Zone prénom valide avec 3 caractères',()=>{
    let zone=component.problemForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('#2 Zone prénom valide avec 3 caractères',()=>{
    let errors={};
    let zone=component.problemForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    errors=zone.errors||{};
    expect(errors['minLength']).toBeFalsy();
  });

  it('#3 Zone prénom valide avec 200 caractères',()=>{
    let zone=component.problemForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it('#2 Zone prénom valide avec 200 caractères',()=>{
    let errors={};
    let zone=component.problemForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    errors=zone.errors||{};
    expect(errors['minLength']).toBeFalsy();
  });

  
  it('#4 Zone prénom invalide avec aucune valeur ',()=>{
    let zone=component.problemForm.controls['prenom'];
    zone.setValue('');
    expect(zone.valid).toBeFalsy();
  });

  it('#4 Zone prénom invalide avec aucune valeur',()=>{
    let errors={};
    let zone=component.problemForm.controls['prenom'];
    zone.setValue('');
    errors=zone.errors||{};
    expect(errors['required']).toBeTruthy();
  });

  it('#5 Zone prénom valide avec 10 espaces ',()=>{
    let zone=component.problemForm.controls['prenom'];
    zone.setValue(' '.repeat(10));
    expect(zone.valid).toBeTruthy();
  });

  it('#5 Zone prénom valide avec 10 espaces',()=>{
    let errors={};
    let zone=component.problemForm.controls['prenom'];
    zone.setValue(' '.repeat(10));
    errors=zone.errors||{};
    expect(errors['required']).toBeFalsy();
  });

  it('#6 Zone prénom valide avec 2 espaces et 1 caractère ',()=>{
    let zone=component.problemForm.controls['prenom'];
    zone.setValue('  a');
    expect(zone.valid).toBeTruthy();
  });

  it('#6 Zone prénom valide avec 2 espaces et 1 caractère',()=>{
    let errors={};
    let zone=component.problemForm.controls['prenom'];
    zone.setValue('  a');
    errors=zone.errors||{};
    expect(errors['required']).toBeFalsy();
  });

});
