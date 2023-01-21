import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorsComponent } from './components/operators-page/operators/operators.component';
import { OperatorComponent } from './components/operator-page/operator/operator.component';
import { ItemsComponent } from './components/items-page/items/items.component';

const routes: Routes = [
  { path: '', redirectTo: 'operators', pathMatch: 'full' },
  { path: 'operators', component: OperatorsComponent },
  { path: 'operator/:opName', component: OperatorComponent },
  { path: 'items', component: ItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
