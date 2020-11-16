import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'atual',
        loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule)
    },
    {
        path: 'raquel',
        loadChildren: () => import('./proposta-produtos/proposta-produtos.module').then(m => m.PropostaProdutosModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
