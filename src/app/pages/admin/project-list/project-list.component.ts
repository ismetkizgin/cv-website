import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProjectComponent, DialogWindowComponent } from 'src/app/components';
import { Project } from 'src/app/models';
import { ProjectService } from '../../../utils/services';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _projectService: ProjectService
  ) { }

  projects: Array<Project>;
  searchText: string;
  paginationConfig = {
    id: 'userList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.projects = <Array<Project>>await this._projectService.listAsync();
    } catch (error) {
      this._projectService.errorNotification(error);
    }
  }

  openAddProjectModal(Id = null) {
    const diologRef = this._dialog.open(AddProjectComponent, {
      width: '500px',
      data: this.projects.find(
        (project) => project.Id == Id
      ),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async projectDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._projectService.deleteAsync({ Id });
          this.projects.splice(
            this.projects.findIndex((project) => project.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('User information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._projectService.errorNotification(error);
        }
      }
    });
  }

}
