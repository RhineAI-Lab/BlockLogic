import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceTabssetBarComponent } from './space-tabsset-bar.component';

describe('SpaceTabssetBarComponent', () => {
  let component: SpaceTabssetBarComponent;
  let fixture: ComponentFixture<SpaceTabssetBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceTabssetBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceTabssetBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
