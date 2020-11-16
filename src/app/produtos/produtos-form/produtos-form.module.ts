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

import { ProdutosFormComponent } from './produtos-form.component';
import { ProdutosFormRouting } from './produtos-form.routing';

@NgModule({
    declarations: [ProdutosFormComponent],
    imports: [
        CommonModule,
        ProdutosFormRouting,
        RouterModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatStepperModule,
        MatSelectModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule
    ]
})
export class ProdutosFormModule { }
