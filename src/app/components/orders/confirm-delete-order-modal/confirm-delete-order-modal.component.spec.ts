import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteOrderModalComponent } from './confirm-delete-order-modal.component';

describe('ConfirmDeleteOrderModalComponent', () => {
  let component: ConfirmDeleteOrderModalComponent;
  let fixture: ComponentFixture<ConfirmDeleteOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteOrderModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
