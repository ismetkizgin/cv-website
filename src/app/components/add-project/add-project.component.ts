import { Component, OnInit, Inject } from '@angular/core';
import { ProjectService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/models';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  constructor(
    private _projectService:ProjectService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  project:Project=new Project();
  _action: Function;
  _userListRenew:boolean=false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this.project = <any>await this._projectService.findAsync(this.data?.Id);
        console.log(this.project)
      } catch (error) {
        this._projectService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    }  else {
      this._userListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(projectForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (projectForm.valid) {
      this._translateService
        .get('Project registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(projectForm))) return;
      this.dialogRef.close(this._userListRenew);
    } else {
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__error';
    }

    this._snackBar.open(notification.message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: notification.panelClass,
    });
  }

  async insertActionAsync(projectForm: NgForm) {
    try {
      console.log(projectForm);
      await this._projectService.insertAsync(projectForm.value);
      projectForm.resetForm();
      this._userListRenew = true;
      return true;
    } catch (error) {
      this._projectService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(projectForm: NgForm) {
    console.log(projectForm.value)
    try {
      await this._projectService.updateAsync(
        Object.assign(projectForm.value, {
          Id: parseInt(
            this.data?.Id
          ),
        })
      );
      return true;
    } catch (error) {
      this._projectService.errorNotification(error);
      return false;
    }
  }

}
