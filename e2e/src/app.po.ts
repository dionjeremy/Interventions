import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('/probleme');
  }

  async getTitleText(): Promise<string> {
    return element(by.css('inter-root h5')).getText();
  }



    async getParagraphText() : Promise<string> {
      return element(by.css('inter-root h5')).getText();
    }

    // Permet de vider toutes les zones.  A appeller dans chaque test.
    async viderToutesLesZones() : Promise<void> {
      element(by.id('prenomId')).clear();  
      element(by.id('nomId')).clear();     
      // Sélectionner le premier élément dans la zone de liste déroulante (Sélectionner un type de problème (obligatoire))
      element(by.id('noTypeProblemeId')).all(by.tagName('option')).get(0).click();      
      // Cliquer sur le bouton radio par défaut (Pas de notification)

      element.all(by.id('NotifiezMoiId')).get(0).click();
      element(by.id('courrielId')).clear();
      element(by.id('courrielConfirmationId')).clear();   
      element(by.id('telephoneId')).clear();       
      element(by.id('noUnite')).clear();
      element(by.id('descriptionProblemeId')).clear();     
    }

      // Inscrire tous les renseignements obligatoires pour le scénario de base HAPPY PATH (saisie minimum obligatoire pour rendre le formulaire valide)
    
   
      async setChampsValidesScenarioNominal() : Promise<void> {
      element(by.id('prenomId')).sendKeys('tonprenom');
      element(by.id('nomId')).sendKeys('tonnom');    
      // Sélectionner le X élément dans la zone de liste déroulante
      element(by.id('noTypeProblemeId')).all(by.tagName('option')).get(2).click();      
      // Cliquer sur le bouton radio voulu
      element.all(by.id('NotifiezMoiId')).get(0).click();  
      element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');

      
    }
    async setChampsValidesScenarioAlternatifCourriel() : Promise<void> {
      element(by.id('prenomId')).sendKeys('tonprenom');
      element(by.id('nomId')).sendKeys('tonnom');    
      // Sélectionner le X élément dans la zone de liste déroulante
      element(by.id('noTypeProblemeId')).all(by.tagName('option')).get(2).click();      
      // Cliquer sur le bouton radio voulu
      element.all(by.id('NotifiezMoiId')).get(1).click();  
      element(by.id('courrielId')).sendKeys('dionjeremy7@gmail.com');
      element(by.id('courrielConfirmationId')).sendKeys('dionjeremy7@gmail.com');
      element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');

      
    }
    async setChampsValidesScenarioAlternatifText() : Promise<void> {
      element(by.id('prenomId')).sendKeys('tonprenom');
      element(by.id('nomId')).sendKeys('tonnom');    
      // Sélectionner le X élément dans la zone de liste déroulante
      element(by.id('noTypeProblemeId')).all(by.tagName('option')).get(2).click();      
      // Cliquer sur le bouton radio voulu
      element.all(by.id('NotifiezMoiId')).get(2).click();  
      element(by.id('telephoneId')).sendKeys('5146472237');
      element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');

      
    }

    

    // Permet d'obtenir toutes les propriétés et leurs valeurs du bouton Sauvegarder
    boutonSubmit() : ElementFinder { 
      return element(by.buttonText('Sauvegarder'));
    }  

    setZoneDescriptionNombreCaracteresInsuffisant(){
      element(by.id('descritpionProblemeId')).clear();
      element(by.id('descriptionProblemeId')).sendKeys('XX');
    }
    setZoneDescriptionNombreCaractereSuffisant(){
      element(by.id('descritpionProblemeId')).clear();
      element(by.id('descriptionProblemeId')).sendKeys('XXXXXXXXXXXXXXXXXXXXXXXXXXX');
    }

    // Permet d'obtenir la classe appliquee actuellement dans la zone Description (entre autres is-valid ou is-invalid)
    obtenirClasseZoneDescriptionProbleme()   { 
      return element(by.id('descriptionProblemeId')).getAttribute("class");
    } 



}
