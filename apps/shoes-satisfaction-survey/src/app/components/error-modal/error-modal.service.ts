import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ErrorMessage } from "../../models/error-message";

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {

  private subject = new Subject<ErrorMessage>()
  private readonly defaultErrorMessage: ErrorMessage = {
    title: 'An error has occurred',
    description: 'Sorry, we are unable to contact our servers at this time. Try again later.'
  }

  getEvents(): Observable<ErrorMessage> {
    return this.subject as Observable<ErrorMessage>
  }

  show(errorMessage: ErrorMessage = this.defaultErrorMessage) {
    this.subject.next(errorMessage)
  }
}