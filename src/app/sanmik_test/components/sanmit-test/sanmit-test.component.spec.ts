import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanmitTestComponent } from './sanmit-test.component';

describe('SanmitTestComponent', () => {
  let component: SanmitTestComponent;
  let fixture: ComponentFixture<SanmitTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanmitTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanmitTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
