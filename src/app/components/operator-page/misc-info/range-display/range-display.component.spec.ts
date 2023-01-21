import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeDisplayComponent } from './range-display.component';

describe('RangeDisplayComponent', () => {
  let component: RangeDisplayComponent;
  let fixture: ComponentFixture<RangeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RangeDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RangeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
