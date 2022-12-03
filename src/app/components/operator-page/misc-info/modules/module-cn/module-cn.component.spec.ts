import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCNComponent } from './module-cn.component';

describe('ModuleCNComponent', () => {
  let component: ModuleCNComponent;
  let fixture: ComponentFixture<ModuleCNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleCNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleCNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
