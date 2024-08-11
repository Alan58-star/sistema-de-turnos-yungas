import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsepcialidadesPageComponent } from './esepcialidades-page.component';

describe('EsepcialidadesPageComponent', () => {
  let component: EsepcialidadesPageComponent;
  let fixture: ComponentFixture<EsepcialidadesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsepcialidadesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsepcialidadesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
