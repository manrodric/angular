import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemateComponent } from './temate.component';

describe('TemateComponent', () => {
  let component: TemateComponent;
  let fixture: ComponentFixture<TemateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
