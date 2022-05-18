import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarAsignaturaComponent } from './asociar-asignatura.component';

describe('AsociarAsignaturaComponent', () => {
  let component: AsociarAsignaturaComponent;
  let fixture: ComponentFixture<AsociarAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociarAsignaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
