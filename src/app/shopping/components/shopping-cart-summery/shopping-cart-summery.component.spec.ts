import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartSummeryComponent } from './shopping-cart-summery.component';

describe('ShoppingCartSummeryComponent', () => {
  let component: ShoppingCartSummeryComponent;
  let fixture: ComponentFixture<ShoppingCartSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
