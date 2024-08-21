import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariaPageComponent } from './secretaria-page.component';

describe('SecretariaPageComponent', () => {
  let component: SecretariaPageComponent;
  let fixture: ComponentFixture<SecretariaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretariaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretariaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
