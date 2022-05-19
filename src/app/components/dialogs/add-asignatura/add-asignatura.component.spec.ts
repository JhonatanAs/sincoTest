import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAsignaturaComponent } from './add-asignatura.component';

describe('AddAsignaturaComponent', () => {
  let component: AddAsignaturaComponent;
  let fixture: ComponentFixture<AddAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAsignaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
