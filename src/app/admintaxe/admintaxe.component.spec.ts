import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintaxeComponent } from './admintaxe.component';

describe('AdmintaxeComponent', () => {
  let component: AdmintaxeComponent;
  let fixture: ComponentFixture<AdmintaxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmintaxeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmintaxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
