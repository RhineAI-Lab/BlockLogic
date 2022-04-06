import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceCenterComponent } from './space-center.component';

describe('SpaceCenterComponent', () => {
  let component: SpaceCenterComponent;
  let fixture: ComponentFixture<SpaceCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceCenterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
