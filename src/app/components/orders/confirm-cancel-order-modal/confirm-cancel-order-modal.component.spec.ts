import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCancelOrderModalComponent } from './confirm-cancel-order-modal.component';

describe('ConfirmCancelOrderModalComponent', () => {
  let component: ConfirmCancelOrderModalComponent;
  let fixture: ComponentFixture<ConfirmCancelOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCancelOrderModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCancelOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
