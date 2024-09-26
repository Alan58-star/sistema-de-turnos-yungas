import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutogestionComponent } from './autogestion.component';

describe('AutogestionComponent', () => {
  let component: AutogestionComponent;
  let fixture: ComponentFixture<AutogestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutogestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutogestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
