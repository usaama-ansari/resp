import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaukriDotComComponent } from './naukri-dot-com.component';

describe('NaukriDotComComponent', () => {
  let component: NaukriDotComComponent;
  let fixture: ComponentFixture<NaukriDotComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaukriDotComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaukriDotComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
