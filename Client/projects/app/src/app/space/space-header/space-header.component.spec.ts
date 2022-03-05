import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceHeaderComponent } from './space-header.component';

describe('SpaceHeaderComponent', () => {
  let component: SpaceHeaderComponent;
  let fixture: ComponentFixture<SpaceHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
