import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarDividerComponent } from './toolbar-divider.component';

describe('ToolbarDividerComponent', () => {
  let component: ToolbarDividerComponent;
  let fixture: ComponentFixture<ToolbarDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarDividerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
