import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceTabBarComponent } from './space-tab-bar.component';

describe('SpaceTabBarComponent', () => {
  let component: SpaceTabBarComponent;
  let fixture: ComponentFixture<SpaceTabBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceTabBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceTabBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
