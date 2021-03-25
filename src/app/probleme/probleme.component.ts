import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProblemes: ITypeProbleme[];
  errorMessage:string;
  constructor(private fb:FormBuilder,private TypeProbleme:TypeproblemeService) { }

  ngOnInit(): void {
    this.problemeForm=this.fb.group({
        prenom:['Votre prénom ici (obligatoire)',[Validators.required,ZoneValidator.longueurMinimum(3)]],
        nom:['Votre nom ici (obligatoire)',[Validators.required,ZoneValidator.longueurMaximum(50)]],
        typeProbleme:['',Validators.required]

    });
    this.TypeProbleme.obtenirProblemes()
    .subscribe(cat => this.typesProblemes = cat,
               error => this.errorMessage = <any>error);  




  }

  save():void{}

}
