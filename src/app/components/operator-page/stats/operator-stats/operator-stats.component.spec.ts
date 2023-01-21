import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorStatsComponent } from './operator-stats.component';

describe('OperatorStatsComponent', () => {
  let component: OperatorStatsComponent;
  let fixture: ComponentFixture<OperatorStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperatorStatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OperatorStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
