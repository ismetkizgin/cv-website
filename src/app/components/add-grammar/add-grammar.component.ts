import { Component, OnInit, Inject } from '@angular/core';
import { GrammarService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Grammar } from 'src/app/models';

@Component({
  selector: 'app-add-grammar',
  templateUrl: './add-grammar.component.html',
  styleUrls: ['./add-grammar.component.scss']
})
export class AddGrammarComponent implements OnInit {

  constructor(
    private _grammarService:GrammarService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private dialogRef: MatDialogRef<AddGrammarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  grammar:Grammar=new Grammar();
  _action: Function;
  _userListRenew:boolean=false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this.grammar = <any>await this._grammarService.findAsync(this.data?.Id);
        console.log(this.grammar)
      } catch (error) {
        this._grammarService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    }  else {
      this._userListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(grammarForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (grammarForm.valid) {
      this._translateService
        .get('grammar registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(grammarForm))) return;
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

  async insertActionAsync(grammarForm: NgForm) {
    try {
      console.log(grammarForm.value);
      await this._grammarService.insertAsync(grammarForm.value);
      grammarForm.resetForm();
      this._userListRenew = true;
      return true;
    } catch (error) {
      this._grammarService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(grammarForm: NgForm) {
    console.log(grammarForm.value)
    try {
      await this._grammarService.updateAsync(
        Object.assign(grammarForm.value, {
          Id: parseInt(
            this.data?.Id
          ),
        })
      );
      return true;
    } catch (error) {
      this._grammarService.errorNotification(error);
      return false;
    }
  }

}
