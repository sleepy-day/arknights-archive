import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorsComponent } from './operators/operators.component';
import { OperatorComponent } from './operator/operator.component';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  { path: '', redirectTo: 'operators', pathMatch: 'full' },
  { path: 'operators', component: OperatorsComponent },
  { path: 'operators/:opName', component: OperatorComponent },
  { path: 'items', component: ItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
