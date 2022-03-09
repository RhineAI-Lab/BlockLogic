import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocklierComponent } from './blocklier.component';

describe('BlocklierComponent', () => {
  let component: BlocklierComponent;
  let fixture: ComponentFixture<BlocklierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlocklierComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocklierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
