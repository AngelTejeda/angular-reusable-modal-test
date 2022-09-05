import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public modalConfig: any = {

  }

  constructor(
  ) { }

  ngOnInit(): void {
  }

  public async openModal(modal: ModalComponent, title: string): Promise<boolean> {
    if (!modal) {
      return false;
    }

    modal.modalConfig = {
      modalTitle: title,
      dismissButtonLabel: 'Dismiss',
      closeButtonLabel: 'Close'
    };

    return await modal.open();
  }

}
