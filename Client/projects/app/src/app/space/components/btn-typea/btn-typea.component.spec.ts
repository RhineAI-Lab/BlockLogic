import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnTypeaComponent } from './btn-typea.component';

describe('BtnTypeaComponent', () => {
  let component: BtnTypeaComponent;
  let fixture: ComponentFixture<BtnTypeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnTypeaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnTypeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
