import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarHolderComponent } from './sidebar-holder.component';

describe('SidebarHolderComponent', () => {
  let component: SidebarHolderComponent;
  let fixture: ComponentFixture<SidebarHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarHolderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
