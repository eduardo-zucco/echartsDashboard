import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardGoogleChartsPage } from './dashboard-google-charts.page';

describe('DashboardGoogleChartsPage', () => {
  let component: DashboardGoogleChartsPage;
  let fixture: ComponentFixture<DashboardGoogleChartsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGoogleChartsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
