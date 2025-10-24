import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTesteSwebPage } from './dashboard-teste-sweb.page';

describe('DashboardTesteSwebPage', () => {
  let component: DashboardTesteSwebPage;
  let fixture: ComponentFixture<DashboardTesteSwebPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTesteSwebPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
