import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuageBannerComponent } from './guage-banner.component';

describe('GuageBannerComponent', () => {
  let component: GuageBannerComponent;
  let fixture: ComponentFixture<GuageBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuageBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuageBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
