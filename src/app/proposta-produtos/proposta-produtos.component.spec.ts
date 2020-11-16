import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaProdutosComponent } from './proposta-produtos.component';

describe('PropostaProdutosComponent', () => {
  let component: PropostaProdutosComponent;
  let fixture: ComponentFixture<PropostaProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropostaProdutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
