import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';

import { ProdutosFormComponent } from './produtos-form.component';
import { ProdutosFormRouting } from './produtos-form.routing';
import { ProdutoDadosFormComponent } from './produto-dados-form/produto-dados-form.component';
import { ProdutoAdicionaisFormComponent } from './produto-adicionais-form/produto-adicionais-form.component';
import { ProdutoIngredientesFormComponent } from './produto-ingredientes-form/produto-ingredientes-form.component';
import { ProdutoCaracteristicasFormComponent } from './produto-caracteristicas-form/produto-caracteristicas-form.component';
import { ProdutoImagemFormComponent } from './produto-imagem-form/produto-imagem-form.component';
import { ImagemUploadModule } from '../imagem-upload/imagem-upload.module';

@NgModule({
    declarations: [
        ProdutosFormComponent,
        ProdutoDadosFormComponent,
        ProdutoAdicionaisFormComponent,
        ProdutoIngredientesFormComponent,
        ProdutoCaracteristicasFormComponent,
        ProdutoImagemFormComponent
    ],
    imports: [
        CommonModule,
        ProdutosFormRouting,
        RouterModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatStepperModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatCardModule,
        MatTableModule,
        ImagemUploadModule,
        NgxCurrencyModule
    ]
})
export class ProdutosFormModule { }
