import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddMemberShipsComponent, DialogWindowComponent } from 'src/app/components';
import { MemberShips } from 'src/app/models';
import { MemberShipsService } from '../../../utils/services';

@Component({
  selector: 'app-member-ships-list',
  templateUrl: './member-ships-list.component.html',
  styleUrls: ['./member-ships-list.component.scss']
})
export class MemberShipsListComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _memberShipsService: MemberShipsService
  ) { }

  memberShips: Array<MemberShips>;
  searchText: string;
  paginationConfig = {
    id: 'memberShipsList',
    itemsPerPage: 10,
    currentPage: 1,
  };


  async ngOnInit() {
    try {
      this.memberShips = <Array<MemberShips>>await this._memberShipsService.listAsync();
    } catch (error) {
      this._memberShipsService.errorNotification(error);
    }
  }

  openAddMemberShipsModal(Id = null) {
    const diologRef = this._dialog.open(AddMemberShipsComponent, {
      width: '500px',
      data:{
        Id
      },
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async memberShipsDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the member ship ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._memberShipsService.deleteAsync({ Id });
          this.memberShips.splice(
            this.memberShips.findIndex((memberShips) => memberShips.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Member Ship information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._memberShipsService.errorNotification(error);
        }
      }
    });
  }

}
