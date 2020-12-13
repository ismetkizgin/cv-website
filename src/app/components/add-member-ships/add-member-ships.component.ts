import { Component, OnInit, Inject } from '@angular/core';
import { MemberShipsService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MemberShips } from 'src/app/models';
@Component({
  selector: 'app-add-member-ships',
  templateUrl: './add-member-ships.component.html',
  styleUrls: ['./add-member-ships.component.scss']
})
export class AddMemberShipsComponent implements OnInit {

  constructor(
    private _memberShipsService:MemberShipsService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    public _router: Router,
    private dialogRef: MatDialogRef<AddMemberShipsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  memberShips:MemberShips=new MemberShips();
  _action: Function;
  _userListRenew:boolean=false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this.memberShips = <any>await this._memberShipsService.findAsync(this.data?.Id);
        console.log(this.memberShips)
      } catch (error) {
        this._memberShipsService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    }  else {
      this._userListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(memberShipsForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (memberShipsForm.valid) {
      this._translateService
        .get('Member Ship registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(memberShipsForm))) return;
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

  async insertActionAsync(memberShipsForm: NgForm) {
    try {
      console.log(memberShipsForm);
      await this._memberShipsService.insertAsync(memberShipsForm.value);
      memberShipsForm.resetForm();
      this._userListRenew = true;
      return true;
    } catch (error) {
      this._memberShipsService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(memberShipsForm: NgForm) {
    console.log(memberShipsForm.value)
    try {
      await this._memberShipsService.updateAsync(
        Object.assign(memberShipsForm.value, {
          Id: parseInt(
            this.data?.Id
          ),
        })
      );
      return true;
    } catch (error) {
      this._memberShipsService.errorNotification(error);
      return false;
    }
  }

}
