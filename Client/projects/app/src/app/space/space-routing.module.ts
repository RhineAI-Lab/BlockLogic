import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpaceComponent } from './space.component';

const routes: Routes = [{ path: '', component: SpaceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaceRoutingModule {}
