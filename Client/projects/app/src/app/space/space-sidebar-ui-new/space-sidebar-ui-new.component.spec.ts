import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSidebarUiNewComponent } from './space-sidebar-ui-new.component';

describe('SpaceSidebarUiNewComponent', () => {
  let component: SpaceSidebarUiNewComponent;
  let fixture: ComponentFixture<SpaceSidebarUiNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceSidebarUiNewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSidebarUiNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
