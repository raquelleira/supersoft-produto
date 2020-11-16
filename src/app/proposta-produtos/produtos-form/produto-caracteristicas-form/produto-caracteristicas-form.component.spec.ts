import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCaracteristicasFormComponent } from './produto-caracteristicas-form.component';

describe('ProdutoCaracteristicasFormComponent', () => {
  let component: ProdutoCaracteristicasFormComponent;
  let fixture: ComponentFixture<ProdutoCaracteristicasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoCaracteristicasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoCaracteristicasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
