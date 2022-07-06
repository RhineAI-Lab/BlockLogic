import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSidebarConsoleOldComponent } from './space-sidebar-console-old.component';

describe('SpaceSidebarConsoleComponent', () => {
  let component: SpaceSidebarConsoleOldComponent;
  let fixture: ComponentFixture<SpaceSidebarConsoleOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceSidebarConsoleOldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSidebarConsoleOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
