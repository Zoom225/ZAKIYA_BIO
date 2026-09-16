import { TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  it('keeps the form invalid until required fields are valid', () => {
    const component = TestBed.runInInjectionContext(() => new ContactComponent());
    expect(component.form.invalid).toBe(true);
    component.form.patchValue({ lastName: 'Koné', firstName: 'Awa', email: 'awa@example.com', subject: 'Commande', message: 'Je souhaite des informations.' });
    expect(component.form.valid).toBe(true);
  });
});
