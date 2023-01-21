import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorStatsLevelComponent } from './operator-stats-level.component';

describe('OperatorStatsLevelComponent', () => {
  let component: OperatorStatsLevelComponent;
  let fixture: ComponentFixture<OperatorStatsLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperatorStatsLevelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OperatorStatsLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
