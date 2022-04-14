import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSidebarUiStructureComponent } from './space-sidebar-ui-structure.component';

describe('SpaceSidebarUiStructureComponent', () => {
  let component: SpaceSidebarUiStructureComponent;
  let fixture: ComponentFixture<SpaceSidebarUiStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceSidebarUiStructureComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSidebarUiStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
