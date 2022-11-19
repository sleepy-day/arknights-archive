import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorVisualDisplayComponent } from './operator-visual-display.component';

describe('OperatorVisualDisplayComponent', () => {
  let component: OperatorVisualDisplayComponent;
  let fixture: ComponentFixture<OperatorVisualDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorVisualDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorVisualDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
