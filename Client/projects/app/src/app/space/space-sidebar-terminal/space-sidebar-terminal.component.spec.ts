import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSidebarTerminalComponent } from './space-sidebar-terminal.component';

describe('SpaceSidebarTerminalComponent', () => {
  let component: SpaceSidebarTerminalComponent;
  let fixture: ComponentFixture<SpaceSidebarTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceSidebarTerminalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSidebarTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
