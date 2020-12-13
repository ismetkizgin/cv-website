import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddActivitiesAttendedComponent, DialogWindowComponent } from 'src/app/components';
import { ActivitiesAttended } from 'src/app/models';
import { ActivitiesAttendedService } from '../../../utils/services';
@Component({
  selector: 'app-activities-attended-list',
  templateUrl: './activities-attended-list.component.html',
  styleUrls: ['./activities-attended-list.component.scss']
})
export class ActivitiesAttendedListComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _activitiesAttendedService: ActivitiesAttendedService
  ) { }
  activitiesAttendeds: Array<ActivitiesAttended>;
  searchText: string;
  paginationConfig = {
    id: 'activitiesAttendedList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.activitiesAttendeds = <Array<ActivitiesAttended>>await this._activitiesAttendedService.listAsync();
    } catch (error) {
      this._activitiesAttendedService.errorNotification(error);
    }
  }

  openAddActivitiesAttendedModal(Id = null) {
    const diologRef = this._dialog.open(AddActivitiesAttendedComponent, {
      width: '500px',
      data: {
        Id
      }
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async activitiesAttendedDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the activities attended ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._activitiesAttendedService.deleteAsync({ Id });
          this.activitiesAttendeds.splice(
            this.activitiesAttendeds.findIndex((activitiesAttended) => activitiesAttended.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Activities Attended information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._activitiesAttendedService.errorNotification(error);
        }
      }
    });
  }

}
