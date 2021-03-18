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

});
