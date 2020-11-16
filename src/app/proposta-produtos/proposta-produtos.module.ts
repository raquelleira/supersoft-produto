import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PropostaProdutosComponent } from './proposta-produtos.component';
import { ProdutosListComponent } from './produtos-list/produtos-list.component';
import { PropostaProdutosRouting } from './proposta-produtos.routing';
import { ProdutosService } from './produtos.service';

@NgModule({
    declarations: [PropostaProdutosComponent, ProdutosListComponent],
    imports: [
        CommonModule,
        PropostaProdutosRouting,
        FlexLayoutModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatTooltipModule
    ],
    providers: [
        ProdutosService
    ]
})
export class PropostaProdutosModule { }
