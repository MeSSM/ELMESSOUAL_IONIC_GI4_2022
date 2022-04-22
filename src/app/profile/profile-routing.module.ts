import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { EnrollFormPage } from '../enroll-form/enroll-form.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'discover',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: () => import('../discover/discover.module').then(x => x.DiscoverPageModule)
          }
        ]
      },
      {
        path: 'enroll/:id',
        children: [
          {
            path: '',
            loadChildren: () => import('../enroll-form/enroll-form.module').then(x => x.EnrollFormPageModule)
          }
        ]
      },
      {
        path: 'favorite',
        children: [
          {
            path: '',
            loadChildren: () => import('../favorite/favorite.module').then(x => x.FavoritePageModule)
          }
        ]
      },
      {
        path: 'enrollement',
        children: [
          {
            path: '',
            loadChildren: () => import('../enrollement/enrollement.module').then(x => x.EnrollementPageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
