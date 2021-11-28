import { Component, OnInit } from '@angular/core';
import { IPangolinRecord } from '../interfaces/IPangolinRecord';
import { PangolinListService } from '../pangolin-list.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  
  pangolinList?: IPangolinRecord[];

  constructor(
    private listService: PangolinListService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void{
    this.listService.getPangolinList().subscribe(result => this.pangolinList = result);
  }

}
