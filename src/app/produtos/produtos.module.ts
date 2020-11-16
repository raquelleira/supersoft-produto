import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProdutosComponent } from './produtos.component';
import { ProdutosRouting } from './produtos.routing';
import { ProdutosService } from './produtos.service';
import { ProdutosListComponent } from './produtos-list/produtos-list.component';


@NgModule({
    declarations: [ProdutosComponent, ProdutosListComponent],
    imports: [
        CommonModule,
        ProdutosRouting,
        FlexLayoutModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatTooltipModule
    ],
    providers: [ProdutosService]
})
export class ProdutosModule { }
