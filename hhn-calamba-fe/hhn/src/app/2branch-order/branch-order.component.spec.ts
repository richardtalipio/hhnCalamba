import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOrderComponent } from './branch-order.component';

describe('BranchOrderComponent', () => {
  let component: BranchOrderComponent;
  let fixture: ComponentFixture<BranchOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
