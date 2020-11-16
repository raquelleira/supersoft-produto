import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { ImagemUploadComponent } from './imagem-upload.component';

@NgModule({
    declarations: [ImagemUploadComponent],
    imports: [
        CommonModule,
        NgxDropzoneModule
    ],
    exports: [
        ImagemUploadComponent
    ]
})
export class ImagemUploadModule { }
