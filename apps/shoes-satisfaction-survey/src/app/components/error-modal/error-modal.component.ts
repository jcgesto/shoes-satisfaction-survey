import { Component, OnInit } from "@angular/core";
import { ErrorMessage } from "../../models/error-message";
import { ErrorModalService } from "./error-modal.service";

@Component({
  selector: 'myorg-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  
  title: string | undefined
  description: string | undefined
  show = false

  constructor(
    private readonly errorModalService: ErrorModalService
  ) { }

  ngOnInit(): void {
    this.errorModalService.getEvents().subscribe((errorMessage: ErrorMessage) => {
      this.title = errorMessage?.title
      this.description = errorMessage?.description
      this.show = true
    })
  }

  onButtonClick() {
    this.show = false
  }
}
