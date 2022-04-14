import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSidebarUiAttributeComponent } from './space-sidebar-ui-attribute.component';

describe('SpaceSidebarUiAttributeComponent', () => {
  let component: SpaceSidebarUiAttributeComponent;
  let fixture: ComponentFixture<SpaceSidebarUiAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceSidebarUiAttributeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSidebarUiAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
