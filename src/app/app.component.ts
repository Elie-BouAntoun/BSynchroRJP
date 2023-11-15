import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class AppComponent {

  constructor() { }

  public show_mobile_menu: boolean = false;

  ToggleMobileMenu() {
    this.show_mobile_menu = !this.show_mobile_menu;

    if (this.show_mobile_menu) {
      $('#menu ul').show().animate({ opacity: 1, right: "0px" }, 800);
    }
    else {
      $('#menu ul').animate({ opacity: 0, right: "-20px" }, 1000, function () {
        $('#menu ul').hide();
        $(this).removeAttr('style');
      });
    }
  }

  MenuItem_onclick() {
    if (this.show_mobile_menu) {
      this.ToggleMobileMenu();
    }
  }
}
