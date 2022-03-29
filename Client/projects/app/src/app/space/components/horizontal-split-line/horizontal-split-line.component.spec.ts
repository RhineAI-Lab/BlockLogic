import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalSplitLineComponent } from './horizontal-split-line.component';

describe('HorizontalSplitLineComponent', () => {
  let component: HorizontalSplitLineComponent;
  let fixture: ComponentFixture<HorizontalSplitLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalSplitLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalSplitLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
