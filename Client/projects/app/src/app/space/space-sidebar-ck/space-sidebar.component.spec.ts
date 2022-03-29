import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSidebarComponent } from './space-sidebar.component';

describe('SpaceSidebarComponent', () => {
  let component: SpaceSidebarComponent;
  let fixture: ComponentFixture<SpaceSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceSidebarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
