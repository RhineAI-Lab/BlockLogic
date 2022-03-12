import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceBlockEditorComponent } from './space-block-editor.component';

describe('SpaceBlockEditorComponent', () => {
  let component: SpaceBlockEditorComponent;
  let fixture: ComponentFixture<SpaceBlockEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceBlockEditorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceBlockEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
