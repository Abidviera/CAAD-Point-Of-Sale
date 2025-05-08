import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosOrderTypeButtonsComponent } from './pos-order-type-buttons.component';

describe('PosOrderTypeButtonsComponent', () => {
  let component: PosOrderTypeButtonsComponent;
  let fixture: ComponentFixture<PosOrderTypeButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosOrderTypeButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosOrderTypeButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
