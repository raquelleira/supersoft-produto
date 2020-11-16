import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemUploadComponent } from './imagem-upload.component';

describe('ImagemUploadComponent', () => {
  let component: ImagemUploadComponent;
  let fixture: ComponentFixture<ImagemUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagemUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagemUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
