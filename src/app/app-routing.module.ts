import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TerrainComponent } from './terrain/terrain.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: 'terrain', component: TerrainComponent },
  { path: 'category', component: CategoryComponent },

  { path: '', component: LoginComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
