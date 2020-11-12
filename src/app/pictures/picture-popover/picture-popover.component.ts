import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-picture-popover',
  templateUrl: './picture-popover.component.html',
  styleUrls: ['./picture-popover.component.scss'],
})
export class PicturePopoverComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  onDelete() {
    this.popoverController.dismiss(true);
  }

}
