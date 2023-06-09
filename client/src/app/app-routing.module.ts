import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductAddComponent } from './pages/admin/product-add/product-add.component';
import { ProductEditComponent } from './pages/admin/product-edit/product-edit.component';
import { CategoryPageComponent } from './pages/admin/category-page/category-page.component';
import { CategoryAddComponent } from './pages/admin/category-add/category-add.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CategoryEditComponent } from './pages/admin/category-edit/category-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'menu', component: MenuPageComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'product/:id', component: ProductDetailComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard/category/add', component: CategoryAddComponent },
      { path: 'dashboard/category', component: CategoryPageComponent },
      { path: 'dashboard/category/edit/:id', component: CategoryEditComponent },
      { path: 'dashboard/product', component: AdminProductComponent },
      { path: 'dashboard/product/add', component: ProductAddComponent },
      { path: 'dashboard/product/edit/:id', component: ProductEditComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
