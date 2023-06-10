import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliComponent } from './deli.component';

describe('DeliComponent', () => {
  let component: DeliComponent;
  let fixture: ComponentFixture<DeliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliComponent]
    });
    fixture = TestBed.createComponent(DeliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
