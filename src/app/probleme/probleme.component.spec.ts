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
  it('champ nom doit comporter au moins 2 caractères',()=>{
    let zone=component.problemForm.controls['nom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });
  it('champ nom doit comporter au moins 2 caractères',()=>{
    let errors={};
    let zone=component.problemForm.controls['nom'];
    zone.setValue('a'.repeat(2));
    errors=zone.errors||{};
    expect(errors['minLength']).toBeFalsy();
  });
});
