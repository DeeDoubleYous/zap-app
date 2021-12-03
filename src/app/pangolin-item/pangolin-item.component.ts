import { Component, OnInit, Input, Inject } from '@angular/core';
import { IPangolinRecord } from '../interfaces/IPangolinRecord';
import { DateHelperModule } from '../date-helper/date-helper.module';

@Component({
  selector: 'app-pangolin-item',
  templateUrl: './pangolin-item.component.html',
  styleUrls: ['./pangolin-item.component.css']
})
export class PangolinItemComponent implements OnInit {
  url = 'https://dw470.brighton.domains/zap_api/';

  dateHelper = new DateHelperModule();

  @Input() pangolin?: IPangolinRecord;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  fetchDateString(): string{
    return this.dateHelper.fetchDateString(this.pangolin);
  } 

  fetchTimeString(): string{
    return this.dateHelper.fetchTimeString(this.pangolin);
  }

}
