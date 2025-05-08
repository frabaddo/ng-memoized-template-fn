import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMemoizedTemplateFnComponent } from './ng-memoized-template-fn.component';

describe('NgMemoizedTemplateFnComponent', () => {
  let component: NgMemoizedTemplateFnComponent;
  let fixture: ComponentFixture<NgMemoizedTemplateFnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgMemoizedTemplateFnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgMemoizedTemplateFnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
