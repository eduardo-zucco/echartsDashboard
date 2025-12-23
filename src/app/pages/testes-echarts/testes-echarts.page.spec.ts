import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestesEchartsPage } from './testes-echarts.page';

describe('TestesEchartsPage', () => {
  let component: TestesEchartsPage;
  let fixture: ComponentFixture<TestesEchartsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestesEchartsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
