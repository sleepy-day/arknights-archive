import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorSkillsComponent } from './operator-skills.component';

describe('OperatorSkillsComponent', () => {
  let component: OperatorSkillsComponent;
  let fixture: ComponentFixture<OperatorSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorSkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
