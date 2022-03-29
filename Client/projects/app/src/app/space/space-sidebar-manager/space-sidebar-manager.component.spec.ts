import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSidebarManagerComponent } from './space-sidebar-manager.component';

describe('SpaceSidebarManagerComponent', () => {
  let component: SpaceSidebarManagerComponent;
  let fixture: ComponentFixture<SpaceSidebarManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceSidebarManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSidebarManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
