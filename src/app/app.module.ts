import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdicionalService } from './shared/adicional/adicional.service';
import { IngredienteService } from './shared/ingredientes/ingrediente.service';
import { CategoriaService } from './shared/categoria/categoria.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [
        AdicionalService,
        IngredienteService,
        CategoriaService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
