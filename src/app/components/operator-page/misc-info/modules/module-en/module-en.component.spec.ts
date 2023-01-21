import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleENComponent } from './module-en.component';

describe('ModuleENComponent', () => {
  let component: ModuleENComponent;
  let fixture: ComponentFixture<ModuleENComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleENComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuleENComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
