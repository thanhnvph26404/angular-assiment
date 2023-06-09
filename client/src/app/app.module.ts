import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { BaseHeaderComponent } from './component/base-header/base-header.component';
import { BaseFooterComponent } from './component/base-footer/base-footer.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { FormComponent } from './component/form/form.component';
import { ProductAddComponent } from './pages/admin/product-add/product-add.component';
import { ProductEditComponent } from './pages/admin/product-edit/product-edit.component';
import { BaseAdminLayoutComponent } from './component/base-admin-layout/base-admin-layout.component';
import { BaseAdminFooterComponent } from './component/base-admin-footer/base-admin-footer.component';
import { CategoryPageComponent } from './pages/admin/category-page/category-page.component';
import { CategoryAddComponent } from './pages/admin/category-add/category-add.component';
import { CategoryEditComponent } from './pages/admin/category-edit/category-edit.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotFoundComponent,
    DashboardComponent,
    AdminProductComponent,
    AdminLayoutComponent,
    BaseLayoutComponent,
    BaseHeaderComponent,
    BaseFooterComponent,
    MenuPageComponent,
    ProductDetailComponent,
    FormComponent,
    ProductAddComponent,
    ProductEditComponent,
    BaseAdminLayoutComponent,
    BaseAdminFooterComponent,
    CategoryPageComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
