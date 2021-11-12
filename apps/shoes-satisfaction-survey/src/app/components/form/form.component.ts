import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { success } from "../../routes";
import { ErrorModalService } from "../error-modal/error-modal.service";
import { FormService } from "./form.service";

@Component({
  selector: 'myorg-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    score: [null, Validators.required],
    notes: ['']
  })
  showErrors = false
  processing = false

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly formService: FormService,
    private readonly router: Router,
    private readonly errorModalService: ErrorModalService
  ) { }

  get name() { return this.form.get('name') }

  get lastname() { return this.form.get('lastname') }

  get email() { return this.form.get('email') }

  get score() { return this.form.get('score') }

  onSubmit() {
    if (this.form?.valid && !this.processing) {
      this.formService.post(this.formatPayload(this.form.value))
        .then(this.handleSuccess.bind(this))
        .catch(this.handleError.bind(this))
      this.processing = true
      this.showErrors = false
    } else {
      this.showErrors = true
    }
  }

  private formatPayload (payload: any) {
    return Object.assign(payload, { score: parseInt(payload.score) })
  }

  private handleSuccess() {
    this.router.navigate([`/${success}`])
  }

  private handleError(error: any) {
    this.processing = false
    if (error.status === 409) {
      this.handleSuccess()
    } else {
      this.errorModalService.show()
    }
  } 
}
