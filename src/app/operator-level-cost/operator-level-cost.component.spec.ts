import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorLevelCostComponent } from './operator-level-cost.component';

describe('OperatorLevelCostComponent', () => {
  let component: OperatorLevelCostComponent;
  let fixture: ComponentFixture<OperatorLevelCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorLevelCostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorLevelCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
