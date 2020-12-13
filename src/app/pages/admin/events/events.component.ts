import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../utils/services';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(
    private _eventService: EventsService,
  ) { }
  
  searchText = "";
  events:Array<Event>;
  async ngOnInit() {
    this.events=<Array<Event>> await this._eventService.listAsync();
    console.log(this.events)
  }

}
