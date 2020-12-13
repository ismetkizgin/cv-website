import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddDocumentationComponent, DialogWindowComponent } from 'src/app/components';
import { Documentation } from 'src/app/models';
import { DocumentationService } from '../../../utils/services';

@Component({
  selector: 'app-documentation-list',
  templateUrl: './documentation-list.component.html',
  styleUrls: ['./documentation-list.component.scss']
})
export class DocumentationListComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _documentationService: DocumentationService
  ) { }

  documentations: Array<Documentation>;
  searchText: string;
  paginationConfig = {
    id: 'documentationList',
    itemsPerPage: 10,
    currentPage: 1,
  };
  async ngOnInit() {
    try {
      this.documentations = <Array<Documentation>>await this._documentationService.listAsync();
    } catch (error) {
      this._documentationService.errorNotification(error);
    }
  }

  openAddDocumentationModal(Id = null) {
    const diologRef = this._dialog.open(AddDocumentationComponent, {
      width: '500px',
      data:{
        Id
      }
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async documentationDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the documentation ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._documentationService.deleteAsync({ Id });
          this.documentations.splice(
            this.documentations.findIndex((documentation) => documentation.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Documentation information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._documentationService.errorNotification(error);
        }
      }
    });
  }

}
