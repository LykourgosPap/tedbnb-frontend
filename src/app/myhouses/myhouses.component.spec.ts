import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyhousesComponent } from './myhouses.component';

describe('MyhousesComponent', () => {
  let component: MyhousesComponent;
  let fixture: ComponentFixture<MyhousesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyhousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyhousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
