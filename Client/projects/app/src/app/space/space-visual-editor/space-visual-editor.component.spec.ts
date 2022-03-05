import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceVisualEditorComponent } from './space-visual-editor.component';

describe('SpaceVisualEditorComponent', () => {
  let component: SpaceVisualEditorComponent;
  let fixture: ComponentFixture<SpaceVisualEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceVisualEditorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceVisualEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
