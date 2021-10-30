import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormService } from "./form.service";

@Component({
    selector: 'myorg-form',
    templateUrl: './form.component.html',
    styleUrls: ['form.component.scss']
})
export class FormComponent {
    form: FormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        satisfaction: [null, Validators.required],
        notes: ['']
    })
    showErrors = false
    processing = false

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly formService: FormService
    ) { }

    get name() { return this.form.get('name') }

    get lastname() { return this.form.get('lastname') }

    get email() { return this.form.get('email') }

    get satisfaction() { return this.form.get('satisfaction') }

    onSubmit() {

        console.log('submit action', this.form?.value)
        if (this.form?.valid && !this.processing) {
            this.formService.post(this.form.value)
            this.processing = true
            this.showErrors = false
        } else {
            this.showErrors = true
        }
    }
}
