import { componentFactoryName } from "@angular/compiler";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./components/form/form.component";
import { form, success } from "./routes";
import { SuccessComponent } from "./components/success/success.component";

const routes: Routes = [
    {
        path: form,
        component: FormComponent
    },
    {
        path: success,
        component: SuccessComponent
    },
    {
        path: '',
        redirectTo: 'form',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'form',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}