import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorSkillsLevelComponent } from './operator-skills-level.component';

describe('OperatorSkillsLevelComponent', () => {
  let component: OperatorSkillsLevelComponent;
  let fixture: ComponentFixture<OperatorSkillsLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorSkillsLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorSkillsLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
