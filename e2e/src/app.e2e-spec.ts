import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('#37 Doit afficher le titre du formulaire Déclarer un problème', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('Déclarer un problème');
  });


  it('#38 Doit activer le bouton Suavegarder avec champs valides scénario nominal',async()=>{
    await page.viderToutesLesZones();
    await page.setChampsValidesScenarioNominal();                             
    expect(await page.boutonSubmit().isEnabled()).toBeTruthy();
  })

  it('#39 Doit activer le boutton Sauvegarder avec champs valides scénario aleternatif par message texte',async()=>{
    await page.viderToutesLesZones();
    await page.setChampsValidesScenarioAlternatifText();                             
    expect(await page.boutonSubmit().isEnabled()).toBeTruthy();
  })
  it('#40 Doit activer le bouton Sauvegarder avec champs valides scénario alternatif par courriel ',async()=>{
    await page.viderToutesLesZones();
    await page.setChampsValidesScenarioAlternatifCourriel();                             
    expect(await page.boutonSubmit().isEnabled()).toBeTruthy();
  })
  it('#41 zone description du problème a une bordure verte si nombre de caractère suffisant',async()=>{
    await page.viderToutesLesZones();
    await page.setZoneDescriptionNombreCaractereSuffisant();                             
    expect((await page.obtenirClasseZoneDescriptionProbleme()).toString()).toContain('is-valid');
    
    
  })
  it('#42 zone Description du prooblème a une bordure rouge si le nombre de caractère insufisant',async()=>{
    await page.viderToutesLesZones();
    await page.setZoneDescriptionNombreCaracteresInsuffisant();                             
    expect((await page.obtenirClasseZoneDescriptionProbleme()).toString()).toContain('is-invalid');
  }) 
  
  it('',async()=>{

  })












  
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
