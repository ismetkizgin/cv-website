import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgSearchFilterModule } from 'ng-search-filter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatModule } from '../../utils';
import {
  AdminSidebarComponent,
  AdminControlSidebarComponent,
  AdminHeaderComponent,
  AdminFooterComponent,
  AdminLayoutComponent,
  DialogWindowComponent,
  AddUserComponent,
  AddProjectComponent,
  AddWorkExperienceComponent, 
  AddHobbyComponent,
} from '../../components/';
import {
  DashboardComponent,
  LoginComponent,
  UserListComponent,
  ProjectListComponent,
  WorkExperienceComponent,
  HobbyListComponent,
} from './';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminControlSidebarComponent,
    AdminSidebarComponent,
    AddProjectComponent,
    LoginComponent,
    AddUserComponent,
    AddWorkExperienceComponent,
    DialogWindowComponent,
    UserListComponent,
    ProjectListComponent,
    WorkExperienceComponent,
    HobbyListComponent,
    AddHobbyComponent,
  ],
  imports: [
    CommonModule,
    MatModule,
    NgSearchFilterModule,
    NgxPaginationModule,
    MatNativeDateModule,
    MatDatepickerModule,
    RouterModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
})
export class AdminLayoutModule { }
