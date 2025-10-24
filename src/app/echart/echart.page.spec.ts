import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EchartPage } from './echart.page';

describe('EchartPage', () => {
  let component: EchartPage;
  let fixture: ComponentFixture<EchartPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
