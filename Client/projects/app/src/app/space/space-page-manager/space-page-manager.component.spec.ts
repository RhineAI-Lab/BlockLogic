import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacePageManagerComponent } from './space-page-manager.component';

describe('SpacePageManagerComponent', () => {
  let component: SpacePageManagerComponent;
  let fixture: ComponentFixture<SpacePageManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacePageManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacePageManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
