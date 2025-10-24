import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashInicialPage } from './dash-inicial.page';

describe('DashInicialPage', () => {
  let component: DashInicialPage;
  let fixture: ComponentFixture<DashInicialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashInicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
