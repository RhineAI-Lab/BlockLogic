import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSidebarConsoleComponent } from './space-sidebar-console.component';

describe('SpaceSidebarConsoleComponent', () => {
  let component: SpaceSidebarConsoleComponent;
  let fixture: ComponentFixture<SpaceSidebarConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceSidebarConsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSidebarConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
