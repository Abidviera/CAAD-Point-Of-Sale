import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosOrderActionButtonsComponent } from './pos-order-action-buttons.component';

describe('PosOrderActionButtonsComponent', () => {
  let component: PosOrderActionButtonsComponent;
  let fixture: ComponentFixture<PosOrderActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosOrderActionButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosOrderActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
