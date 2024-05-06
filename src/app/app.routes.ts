import { Routes } from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { AboutComponent } from "./public/pages/about/about.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { StudentManagementComponent } from "./learning/pages/student-management/student-management.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'learning/students', component: StudentManagementComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
