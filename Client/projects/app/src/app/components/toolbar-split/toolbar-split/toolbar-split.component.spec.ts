import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarSplitComponent } from './toolbar-split.component';

describe('ToolbarSplitComponent', () => {
  let component: ToolbarSplitComponent;
  let fixture: ComponentFixture<ToolbarSplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarSplitComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
