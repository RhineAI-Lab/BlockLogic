import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSidebarLayoutComponent } from './space-sidebar-layout.component';

describe('SpaceSidebarLayoutComponent', () => {
  let component: SpaceSidebarLayoutComponent;
  let fixture: ComponentFixture<SpaceSidebarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceSidebarLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
