import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePriceSettingPopupComponent } from './service-price-setting-popup.component';

describe('ServicePriceSettingPopupComponent', () => {
  let component: ServicePriceSettingPopupComponent;
  let fixture: ComponentFixture<ServicePriceSettingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicePriceSettingPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicePriceSettingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
