import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoria0Component } from './categoria0.component';

describe('Categoria0Component', () => {
  let component: Categoria0Component;
  let fixture: ComponentFixture<Categoria0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Categoria0Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categoria0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
