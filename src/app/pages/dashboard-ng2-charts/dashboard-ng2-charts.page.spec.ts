import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardNg2ChartsPage } from './dashboard-ng2-charts.page';

describe('DashboardNg2ChartsPage', () => {
  let component: DashboardNg2ChartsPage;
  let fixture: ComponentFixture<DashboardNg2ChartsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNg2ChartsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
