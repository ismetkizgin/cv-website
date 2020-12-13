import { Component, OnInit, Inject } from '@angular/core';
import { CompetencyService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Competency } from 'src/app/models';

@Component({
  selector: 'app-add-competency',
  templateUrl: './add-competency.component.html',
  styleUrls: ['./add-competency.component.scss']
})
export class AddCompetencyComponent implements OnInit {

  constructor(
    private _competencyService:CompetencyService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private dialogRef: MatDialogRef<AddCompetencyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  competency:Competency=new Competency();
  _action: Function;
  _userListRenew:boolean=false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this.competency = <any>await this._competencyService.findAsync(this.data?.Id);
        console.log(this.competency)
      } catch (error) {
        this._competencyService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    }  else {
      this._userListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(competencyForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (competencyForm.valid) {
      this._translateService
        .get('Project registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(competencyForm))) return;
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

  async insertActionAsync(competencyForm: NgForm) {
    try {
      console.log(competencyForm);
      await this._competencyService.insertAsync(competencyForm.value);
      competencyForm.resetForm();
      this._userListRenew = true;
      return true;
    } catch (error) {
      this._competencyService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(competencyForm: NgForm) {
    console.log(competencyForm.value)
    try {
      await this._competencyService.updateAsync(
        Object.assign(competencyForm.value, {
          Id: parseInt(
            this.data?.Id
          ),
        })
      );
      return true;
    } catch (error) {
      this._competencyService.errorNotification(error);
      return false;
    }
  }
}
