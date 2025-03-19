import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductModalComponent } from './order-product-modal.component';

describe('OrderProductModalComponent', () => {
  let component: OrderProductModalComponent;
  let fixture: ComponentFixture<OrderProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProductModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
