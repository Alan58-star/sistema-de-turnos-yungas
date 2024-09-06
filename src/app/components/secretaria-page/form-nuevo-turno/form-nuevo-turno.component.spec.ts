import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNuevoTurnoComponent } from './form-nuevo-turno.component';

describe('FormNuevoTurnoComponent', () => {
  let component: FormNuevoTurnoComponent;
  let fixture: ComponentFixture<FormNuevoTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNuevoTurnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNuevoTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
