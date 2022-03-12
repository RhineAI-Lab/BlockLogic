import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceCodeEditorComponent } from './space-code-editor.component';

describe('SpaceCodeEditorComponent', () => {
  let component: SpaceCodeEditorComponent;
  let fixture: ComponentFixture<SpaceCodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceCodeEditorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
