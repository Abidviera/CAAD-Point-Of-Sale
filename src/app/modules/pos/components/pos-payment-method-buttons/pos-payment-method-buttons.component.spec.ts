import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosPaymentMethodButtonsComponent } from './pos-payment-method-buttons.component';

describe('PosPaymentMethodButtonsComponent', () => {
  let component: PosPaymentMethodButtonsComponent;
  let fixture: ComponentFixture<PosPaymentMethodButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosPaymentMethodButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosPaymentMethodButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
