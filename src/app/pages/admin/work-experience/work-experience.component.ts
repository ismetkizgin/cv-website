import { Component, OnInit } from '@angular/core';
import { WorkExperienceService } from '../../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogWindowComponent } from 'src/app/components';
import { WorkExperience } from 'src/app/models';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {

  constructor(
    private _workExperienceService: WorkExperienceService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
  ) { }

  searchText = "";
  works: Array<WorkExperience>;

  async ngOnInit() {
    try {
      this.works = <Array<WorkExperience>>await this._workExperienceService.listAsync();
    } catch (error) {
      this._workExperienceService.errorNotification(error);
    }
  }

  async workExperienceDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._workExperienceService.deleteAsync({ Id });
          this.works.splice(
            this.works.findIndex((work) => work.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Work Experience information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._workExperienceService.errorNotification(error);
        }
      }
    });
  }

}
