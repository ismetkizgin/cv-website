import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ClientLayoutComponent,
  AdminLayoutComponent,
} from './components/layouts';
import { 
  HomepageComponent, 
  DashboardComponent, 
  LoginComponent, 
  UserListComponent,
  ProjectListComponent,
  WorkExperienceComponent,
  MemberShipsListComponent,
  HobbyListComponent,
  PersonalInformationComponent,
  GrammarListComponent,
  DocumentationListComponent,
  EventsComponent
} from './pages';
import { AuthGuard } from './utils/guards';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [{ path: '', component: HomepageComponent }],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'Dashboard', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'users',
        component: UserListComponent,
        data: { title: 'User List', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'projects',
        component: ProjectListComponent,
        data: { title: 'Project List', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'works',
        component: WorkExperienceComponent,
        data: { title: 'Work Experience List', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'member-ships',
        component: MemberShipsListComponent,
        data: { title: 'Member Ships List', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'hobbies',
        component: HobbyListComponent,
        data: { title: 'Hobby List', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'personal',
        component: PersonalInformationComponent,
        data: { title: 'Personal List', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'grammar',
        component: GrammarListComponent,
        data: { title: 'Grammar List', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'documentation',
        component: DocumentationListComponent,
        data: { title: 'Documentation List', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'event',
        component: EventsComponent,
        data: { title: 'Event List', icon: 'fa fa-2x fa-home' },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'ismet w' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [];
