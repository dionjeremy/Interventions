import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        prenom:['Votre prénom ici (obligatoire)',[Validators.minLength(3),Validators.required]]
    });


  }

  save():void{}

}
