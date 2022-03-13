import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSidebarFilesComponent } from './space-sidebar-files.component';

describe('SpaceSidebarFilesComponent', () => {
  let component: SpaceSidebarFilesComponent;
  let fixture: ComponentFixture<SpaceSidebarFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceSidebarFilesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSidebarFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
