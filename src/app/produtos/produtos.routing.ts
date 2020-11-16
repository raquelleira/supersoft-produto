import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosComponent } from './produtos.component';

const routes: Routes = [
    {
        path: '',
        component: ProdutosComponent
    },
    {
        path: 'produtos-form',
        loadChildren: () => import('./produtos-form/produtos-form.module').then(m => m.ProdutosFormModule),
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRouting { }
