import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestresultsComponent } from './testresults.component';

describe('TestresultsComponent', () => {
  let component: TestresultsComponent;
  let fixture: ComponentFixture<TestresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
