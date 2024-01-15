import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TerrainComponent } from './terrain/terrain.component';
import { CategoryComponent } from './category/category.component';
import { RedevableComponent } from './redevable/redevable.component';
import { TauxComponent } from './taux/taux.component';
import { TaxeComponent } from './taxe/taxe.component';
import { AdmintaxeComponent } from './admintaxe/admintaxe.component';

const routes: Routes = [
  { path: 'terrain', component: TerrainComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'redevable', component: RedevableComponent },
  { path: 'taux', component: TauxComponent },
  { path: 'taxe', component: TaxeComponent },
  { path: 'adminTaxe', component: AdmintaxeComponent },

  { path: '', component: LoginComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
