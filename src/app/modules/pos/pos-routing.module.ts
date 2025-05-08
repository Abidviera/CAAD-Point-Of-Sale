import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointOfSaleComponent } from './components/point-of-sale/point-of-sale.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PointOfSaleComponent , canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class POSRoutingModule { }
