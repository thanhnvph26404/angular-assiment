import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAdminFooterComponent } from './base-admin-footer.component';

describe('BaseAdminFooterComponent', () => {
  let component: BaseAdminFooterComponent;
  let fixture: ComponentFixture<BaseAdminFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseAdminFooterComponent]
    });
    fixture = TestBed.createComponent(BaseAdminFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
