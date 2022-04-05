import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceToolBarComponent } from './space-tool-bar.component';

describe('SpaceToolBarComponent', () => {
  let component: SpaceToolBarComponent;
  let fixture: ComponentFixture<SpaceToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceToolBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
