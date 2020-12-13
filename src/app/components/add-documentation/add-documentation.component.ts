import { Component, OnInit, Inject } from '@angular/core';
import { DocumentationService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Documentation } from 'src/app/models';


@Component({
  selector: 'app-add-documentation',
  templateUrl: './add-documentation.component.html',
  styleUrls: ['./add-documentation.component.scss']
})
export class AddDocumentationComponent implements OnInit {

  constructor(
    private _documentationService:DocumentationService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private dialogRef: MatDialogRef<AddDocumentationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  documentation:Documentation=new Documentation();
  _action: Function;
  _userListRenew:boolean=false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this.documentation = <any>await this._documentationService.findAsync(this.data?.Id);
        console.log(this.documentation)
      } catch (error) {
        this._documentationService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    }  else {
      this._userListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(documentationForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (documentationForm.valid) {
      this._translateService
        .get('Documentation registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(documentationForm))) return;
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

  async insertActionAsync(documentationForm: NgForm) {
    try {
      console.log(documentationForm);
      await this._documentationService.insertAsync(documentationForm.value);
      documentationForm.resetForm();
      this._userListRenew = true;
      return true;
    } catch (error) {
      this._documentationService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(documentationForm: NgForm) {
    console.log(documentationForm.value)
    try {
      await this._documentationService.updateAsync(
        Object.assign(documentationForm.value, {
          Id: parseInt(
            this.data?.Id
          ),
        })
      );
      return true;
    } catch (error) {
      this._documentationService.errorNotification(error);
      return false;
    }
  }

}
