import { Component, OnInit, Input, Inject } from '@angular/core';
import { IPangolinRecord } from '../interfaces/IPangolinRecord';

@Component({
  selector: 'app-pangolin-item',
  templateUrl: './pangolin-item.component.html',
  styleUrls: ['./pangolin-item.component.css']
})
export class PangolinItemComponent implements OnInit {

  
  url = 'https://dw470.brighton.domains/zap_api/';

  @Input() pangolin?: IPangolinRecord;

  constructor(
    ) { }

  ngOnInit(): void {
  }

}
