import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { timer } from "rxjs";
import { map } from "rxjs/operators";
import { SatisfactionSurvey } from "../../models/satisfaction-survey.model";
import { success } from "../../routes";

@Injectable({
    providedIn: 'root'
})
export class FormService {

    constructor (
        private readonly http: HttpClient,
        private readonly router: Router
    ) {}

    post (satisfactionSurvey: SatisfactionSurvey) {
        // this.http.post('url', satisfactionSurvey)
        timer(5000).pipe(map((_) => ({})))
        .toPromise()
            .then(this.handleSuccess.bind(this))
            .catch(this.handleError.bind(this))
    }

    private handleSuccess () {
        this.router.navigate([`/${success}`])
    }

    private handleError (error: any) {
        console.log('ERROR', error)
    }
}