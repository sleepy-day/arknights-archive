import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorClassComponent } from './operator-class.component';

describe('OperatorClassComponent', () => {
  let component: OperatorClassComponent;
  let fixture: ComponentFixture<OperatorClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperatorClassComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OperatorClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
