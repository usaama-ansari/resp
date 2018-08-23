import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExistingComponent } from './edit-existing.component';

describe('EditExistingComponent', () => {
  let component: EditExistingComponent;
  let fixture: ComponentFixture<EditExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
