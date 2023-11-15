import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable()
export class SharedFunctions {
  GetAnimatedSectionTime(): number {
    return 800;
  }

  AnimateSectionOnShow(p_section_id: string) {
    setTimeout(() => {
      $('#' + p_section_id).animate({ opacity: 1, "margin-top": "0px" }, this.GetAnimatedSectionTime());
    }, 100);
  }

  AnimateSectionOnClose(p_section_id: string) {
    $('#' + p_section_id).animate({ opacity: 0, "margin-top": "-20px" }, this.GetAnimatedSectionTime());
  }
}
