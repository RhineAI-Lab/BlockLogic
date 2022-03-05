import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceToolbarComponent } from './space-toolbar.component';

describe('SpaceToolbarComponent', () => {
  let component: SpaceToolbarComponent;
  let fixture: ComponentFixture<SpaceToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceToolbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
