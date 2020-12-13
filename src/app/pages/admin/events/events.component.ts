import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../utils/services';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEventComponent, DialogWindowComponent } from 'src/app/components';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(
    private _eventService: EventsService,
    private _dialog: MatDialog,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
  ) { }
  
  searchText = "";
  events:Array<Event>;
  async ngOnInit() {
    try{
      this.events=<Array<Event>> await this._eventService.listAsync();
    }catch(error){
      this._eventService.errorNotification(error);
    }
  }

  openAddEventModal(Id=null){
    const diologRef = this._dialog.open(AddEventComponent, {
      width: '500px',
      data: this.events.find(
        (event) => event.Id == Id
      ),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
}

async eventDelete(Id) {
  const diologRef = this._dialog.open(DialogWindowComponent, {
    data: {
      message: 'Are you sure you want to delete the user ?',
      icon: 'fa fa-exclamation',
    },
  });

  diologRef.afterClosed().subscribe(async (result: boolean) => {
    if (result) {
      try {
        await this._eventService.deleteAsync({ Id });
        this.events.splice(
          this.events.findIndex((event) => event.Id == Id),
          1
        );
        let notificationMessage: string;
        this._translateService
          .get('Event information was successfully deleted')
          .subscribe((value) => (notificationMessage = value));

        this._snackBar.open(notificationMessage, 'X', {
          duration: 3000,
          panelClass: 'notification__success',
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
      } catch (error) {
        this._eventService.errorNotification(error);
      }
    }
  });
}

}
