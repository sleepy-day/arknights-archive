import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleStatsComponent } from './module-stats.component';

describe('ModuleStatsComponent', () => {
  let component: ModuleStatsComponent;
  let fixture: ComponentFixture<ModuleStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
