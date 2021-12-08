import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListViewComponent } from './list-view/list-view.component';
import { MapComponent } from './map/map.component';
import { PangolinFormComponent } from './pangolin-form/pangolin-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'form', component: PangolinFormComponent},
  {path: 'list', component: ListViewComponent},
  {path: 'map',  component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
