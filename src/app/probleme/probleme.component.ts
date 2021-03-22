import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneValidator } from '../shared/longueur-minimum/longueur-minimum.component';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.problemeForm=this.fb.group({
        prenom:['Votre prénom ici (obligatoire)',[Validators.required,ZoneValidator.longueurMinimum(3)]]
    });


  }

  save():void{}

}
