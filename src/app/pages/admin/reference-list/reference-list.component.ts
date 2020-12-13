import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddReferenceComponent, DialogWindowComponent } from 'src/app/components';
import { Reference } from 'src/app/models';
import { ReferenceService } from '../../../utils/services';
@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['./reference-list.component.scss']
})
export class ReferenceListComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _referenceService: ReferenceService
  ) { }

  references: Array<Reference>;
  searchText: string;
  paginationConfig = {
    id: 'referenceList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.references = <Array<Reference>>await this._referenceService.listAsync();
    } catch (error) {
      this._referenceService.errorNotification(error);
    }
  }
  openAddReferenceModal(Id = null) {
    console.log("deneme");
    const diologRef = this._dialog.open(AddReferenceComponent, {
      width: '500px',
      data: {
        Id
      }
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async referenceDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._referenceService.deleteAsync({ Id });
          this.references.splice(
            this.references.findIndex((reference) => reference.Id == Id),
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
          this._referenceService.errorNotification(error);
        }
      }
    });
  }

}
