import { NgModule } from "@angular/core";
import { ApiHelperService } from "../services/api-helper.service";
import { DashboardApiService } from "./dashboard/dashboard-api.service";
import { MongoTestapiService } from "../services/mongoTest/mongo-testapi.service";
import { WindowRefService } from "../services/window-ref.service";
import { LocalizationService } from './localization/localization.service';
import { OrderstatusService } from './order-status/order-status.service';
import { PartRequestsService } from './part-requests/part-requests.service';
import { CasesService } from './cases/cases.service';
import { AseCornerService } from './ase-corner/ase-corner.service';
import { ContractserviceService } from './contractsandwarranties/contractservice.service';
import { SystemDetailsApiService } from "app/services/system-details-api.service";

@NgModule({
    providers: [
        LocalizationService,
        ApiHelperService,
        OrderstatusService,
        DashboardApiService,
        MongoTestapiService,
        WindowRefService,
        PartRequestsService,
        CasesService,
        AseCornerService,
        ContractserviceService,
        SystemDetailsApiService
    ]
})

export class ServicesModule { }