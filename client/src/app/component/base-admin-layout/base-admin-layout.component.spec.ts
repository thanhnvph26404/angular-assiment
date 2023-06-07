import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAdminLayoutComponent } from './base-admin-layout.component';

describe('BaseAdminLayoutComponent', () => {
  let component: BaseAdminLayoutComponent;
  let fixture: ComponentFixture<BaseAdminLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseAdminLayoutComponent]
    });
    fixture = TestBed.createComponent(BaseAdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
