import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceToolsBarComponent } from './space-tools-bar.component';

describe('SpaceToolsBarComponent', () => {
  let component: SpaceToolsBarComponent;
  let fixture: ComponentFixture<SpaceToolsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceToolsBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceToolsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
