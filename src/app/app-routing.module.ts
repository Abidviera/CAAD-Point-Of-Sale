import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/security/security.module').then(
            (m) => m.SecurityModule
          ),
      },
    ],
  },
  {
    path: 'd',
    loadChildren: () =>
      import('./modules/pos/pos.module').then((m) => m.POSModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
