import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnIconComponent } from './btn-icon.component';

describe('BtnIconComponent', () => {
  let component: BtnIconComponent;
  let fixture: ComponentFixture<BtnIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
