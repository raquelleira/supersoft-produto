import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoImagemFormComponent } from './produto-imagem-form.component';

describe('ProdutoImagemFormComponent', () => {
  let component: ProdutoImagemFormComponent;
  let fixture: ComponentFixture<ProdutoImagemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoImagemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoImagemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
