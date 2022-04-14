import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSidebarUiTreeComponent } from './space-sidebar-ui-tree.component';

describe('SpaceSidebarUiTreeComponent', () => {
  let component: SpaceSidebarUiTreeComponent;
  let fixture: ComponentFixture<SpaceSidebarUiTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceSidebarUiTreeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSidebarUiTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
