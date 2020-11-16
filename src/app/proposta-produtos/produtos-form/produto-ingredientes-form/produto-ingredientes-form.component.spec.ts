import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoIngredientesFormComponent } from './produto-ingredientes-form.component';

describe('ProdutoIngredientesFormComponent', () => {
  let component: ProdutoIngredientesFormComponent;
  let fixture: ComponentFixture<ProdutoIngredientesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoIngredientesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoIngredientesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
