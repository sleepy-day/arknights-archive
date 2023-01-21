import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorSkillsCostComponent } from './operator-skills-cost.component';

describe('OperatorSkillsCostComponent', () => {
  let component: OperatorSkillsCostComponent;
  let fixture: ComponentFixture<OperatorSkillsCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperatorSkillsCostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OperatorSkillsCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
