import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPangolinRecord } from '../interfaces/IPangolinRecord';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DateHelperModule { 
  fetchDateString(pangolin: IPangolinRecord | undefined): string{
    if(pangolin?.time){
      const date = new Date(pangolin.time);
      return date.toLocaleDateString();
    }
    return '';
  }

  fetchTimeString(pangolin: IPangolinRecord | undefined): string{
    if(pangolin?.time){
      const date = new Date(pangolin.time);
      return date.toLocaleTimeString();
    }
    return '';
  }
}
