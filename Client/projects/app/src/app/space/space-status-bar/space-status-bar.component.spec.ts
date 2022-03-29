import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceStatusBarComponent } from './space-status-bar.component';

describe('SpaceStatusBarComponent', () => {
  let component: SpaceStatusBarComponent;
  let fixture: ComponentFixture<SpaceStatusBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceStatusBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
