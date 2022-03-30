import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSidebarProjectsComponent } from './space-sidebar-projects.component';

describe('SpaceSidebarFilesComponent', () => {
  let component: SpaceSidebarProjectsComponent;
  let fixture: ComponentFixture<SpaceSidebarProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceSidebarProjectsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSidebarProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
