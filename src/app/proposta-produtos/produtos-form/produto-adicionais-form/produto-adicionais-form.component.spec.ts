import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoAdicionaisFormComponent } from './produto-adicionais-form.component';

describe('ProdutoAdicionaisFormComponent', () => {
  let component: ProdutoAdicionaisFormComponent;
  let fixture: ComponentFixture<ProdutoAdicionaisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoAdicionaisFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoAdicionaisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
