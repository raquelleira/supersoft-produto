import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoDadosFormComponent } from './produto-dados-form.component';

describe('ProdutoDadosFormComponent', () => {
  let component: ProdutoDadosFormComponent;
  let fixture: ComponentFixture<ProdutoDadosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoDadosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoDadosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
