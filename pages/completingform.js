const { I, steps_file } = inject();

module.exports = {

  // insert your locators and methods here
  fields: {
    email: 'email',
    password: '#user_basic_password'
  },

  sendForm(email) {
  I.amOnPage('http://mijneetschema.nl/');
  //pause();
  I.click("Eetschema aanvragen");
  I.waitForText('SELECTEER JOUW GESLACHT',5);
  I.click('Man');
  I.click('DOORGAAN MET');
  I.waitForText('AFVALLEN');
  I.click('AFVALLEN');
  I.click('DOORGAAN MET');
  I.waitForText('1-3 x per week sporten + actief werk');
  I.click('1-3 x per week sporten + actief werk');
  I.click('DOORGAAN MET');
  I.waitForText('RUNDVLEES');
  I.click('PERSOONLIJKE METING');
  I.waitForText('JOUW PERSOONLIJKE GEGEVENS');
  I.fillField('name', 'miquel');
  I.fillField('age', '30');
  I.fillField('fat_percent', '12');
  I.fillField('length', '180');
  I.fillField('current_weight', '80');
  I.fillField('target_weight', '75');
  I.fillField(this.fields.email, email);
  I.click('DOORGAAN MET');
  pause();
  I.waitForText('ECTOMORPH',5);
  I.click('ECTOMORPH');
  I.click('DOORGAAN MET');
  I.waitForText('JOUW PERSOONLIJKE MAALTIJDPLAN VAN 90 DAGEN STAAT KLAAR');
  }
}

