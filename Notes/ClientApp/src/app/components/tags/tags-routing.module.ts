import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "src/app/services/auth-guard";
import { TagsComponent } from "./tags/tags.component";
import { RouteData } from "../auth/route-data.model";

const routes: Routes = [
    {
        path: '', canActivate: [AuthGuard],
        children: [
            {
                path: '', component: TagsComponent
            }
        ],
        data: RouteData.includeclaims(["Authenticated"])
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TagsRoutingModule {

}
