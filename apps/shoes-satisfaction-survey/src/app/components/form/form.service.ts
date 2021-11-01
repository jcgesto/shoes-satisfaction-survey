import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICreateSatisfactionSurveyDto, satisfactionSurvey } from "@myorg/api-interfaces";
import { environment } from "apps/shoes-satisfaction-survey/src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  url = `${environment.apiBaseUrl}/${satisfactionSurvey}`

  constructor(
    private readonly http: HttpClient
  ) { }

  post(createSatisfactionSurvey: ICreateSatisfactionSurveyDto) {
    return this.http.post(this.url, createSatisfactionSurvey)
      .toPromise()
  }
}