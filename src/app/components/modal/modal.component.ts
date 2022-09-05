import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalConfig } from 'src/app/shared/modal-config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input() public modalConfig!: ModalConfig;
  @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>;

  private modalRef: NgbModalRef | null = null;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  public open(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.modalRef = this.modalService.open(this.modalContent);
      this.modalRef.result.then(resolve, resolve);
    });
  }

  public async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || await this.modalConfig.shouldClose()) {
      const result = this.modalConfig.onClose === undefined || await this.modalConfig.onClose();
      this.modalRef?.close(result);
    }
  }

  public async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || await this.modalConfig.shouldDismiss()) {
      const result = this.modalConfig.onDismiss === undefined || await this.modalConfig.onDismiss();
      this.modalRef?.dismiss(result);
    }
  }
}
