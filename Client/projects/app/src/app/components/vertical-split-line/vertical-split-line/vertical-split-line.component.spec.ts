import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalSplitLineComponent } from './vertical-split-line.component';

describe('VerticalSplitLineComponent', () => {
  let component: VerticalSplitLineComponent;
  let fixture: ComponentFixture<VerticalSplitLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalSplitLineComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalSplitLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
