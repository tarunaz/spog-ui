import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OffClickModule } from 'angular2-off-click';
import { CapacityComponent } from "./auto-support/capacity/capacity.component";
import { AutoSupportWidgetComponent } from "./auto-support/auto-support-widget.component";
import { CasesWidgetComponent } from "./cases/cases-widget.component";
import { GpsWidgetComponent } from "./gps/gps-widget.component";
import { OrderStatusWidgetComponent } from "./order-status/order-status-widget.component";
import { PartRequestsWidgetComponent } from "./part-requests/part-requests-widget.component";
import { SoftwareDownloadsWidgetComponent } from "./software-downloads/software-downloads-widget.component";
import { ProductTypeComponent } from "./system-inventory/product-type/product-type.component";
import { SupportStatusComponent } from "./system-inventory/support-status/support-status.component";
import { SystemInventoryWidgetComponent } from "./system-inventory/system-inventory-widget.component";
import { DonutChartComponent } from "../components/donut-chart/donut-chart.component";
import { SpogTabComponent } from "../components/spog-tab/spog-tab.component";
import { NavMoredetailComponent } from "../components/nav-moredetail/nav-moredetail.component";
import { DynamicComponentLoaderComponent } from '../components/dynamic-componentloader/dynamic-componentloader.component';
import { WidgetDropdownComponent } from "../components/widget-dropdown/widget-dropdown.component"
import { SystemHealthComponent } from "../widgets/auto-support/system-health/system-health.component"
import { PerformanceComponent } from "../widgets/auto-support/performance/performance.component";
import { EfficiencyComponent } from "../widgets/auto-support/efficiency/efficiency.component";
import { WidgetHeaderComponent } from '../components/widget-header/widget-header.component';
import { ActiveiqDataWrapper } from '../widgets/auto-support/activeiq-data-wrapper';
import { SpogGridComponent } from '../components/grid/spog-grid.component';
import { TabModule } from '../components/tab/tab.module';
import { BugSearchComponent } from './bug-search/bug-search.component';
import { SpogAutoCompleteComponent } from '../components/autocomplete/spog-autocomplete.component';
import { ActiveiqService } from '../services/activeiq/activeiq.service';
import { PipeModule } from '../components/pipe/pipe.module';
import { BugSearchDataWrapper } from './bug-search/bug-search-data-wrapper';
import { BugSearchService } from '../services/bug-search/bug-search.service';
import { Constants } from "../common/constants";
import { SystemInventoryWrapper } from '../widgets/system-inventory/system-inventory-wrapper';
import { SpogUtils } from '../common/spog-utils';
import { ModaalPopupComponent } from "../components/modaal-popup/modaal-popup.component";
import { AseCornerComponent } from "../widgets/ase-corner/ase-corner.component";
import { ContractsAndWarrantiesComponent } from './contracts-and-warranties/contracts-and-warranties.component';
import { SpogTableGridComponent } from '../components/table-grid/spog-table-grid/spog-table-grid.component';

import { SystemDetailsWidgetComponent } from './system-details-widget/system-details-widget.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BookFilterPipe } from 'app/components/table-grid/spog-table-grid/category.pipe';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
@NgModule({
    imports: [
        BrowserModule,
        ChartsModule,
        TabModule,
        FormsModule,
        OffClickModule,
        InfiniteScrollModule,
        VirtualScrollModule,
        PipeModule.forRoot()
    ],
    declarations: [
        CapacityComponent,
        AutoSupportWidgetComponent,
        CasesWidgetComponent,
        GpsWidgetComponent,
        OrderStatusWidgetComponent,
        PartRequestsWidgetComponent,
        SoftwareDownloadsWidgetComponent,
        ProductTypeComponent,
        SupportStatusComponent,
        SystemInventoryWidgetComponent,
        DonutChartComponent,
        SpogTabComponent,
        NavMoredetailComponent,
        DynamicComponentLoaderComponent,
        WidgetDropdownComponent,
        SystemHealthComponent,
        EfficiencyComponent,
        PerformanceComponent,
        WidgetHeaderComponent,
        SpogGridComponent,
        BugSearchComponent,
        SpogAutoCompleteComponent,
        ModaalPopupComponent,
        AseCornerComponent,
        ContractsAndWarrantiesComponent,
        SpogTableGridComponent,
        SystemDetailsWidgetComponent,
        BookFilterPipe

    ],
    entryComponents: [
        CapacityComponent,
        SystemHealthComponent,
        EfficiencyComponent,
        PerformanceComponent,
        SupportStatusComponent,
        ProductTypeComponent
    ],
    exports: [
        CapacityComponent,
        AutoSupportWidgetComponent,
        CasesWidgetComponent,
        GpsWidgetComponent,
        OrderStatusWidgetComponent,
        PartRequestsWidgetComponent,
        SoftwareDownloadsWidgetComponent,
        ProductTypeComponent,
        SupportStatusComponent,
        SystemInventoryWidgetComponent,
        DonutChartComponent,
        SpogTabComponent,
        NavMoredetailComponent,
        DynamicComponentLoaderComponent,
        WidgetDropdownComponent,
        SystemHealthComponent,
        EfficiencyComponent,
        PerformanceComponent,
        WidgetHeaderComponent,
        BugSearchComponent,
        SpogAutoCompleteComponent,
        ModaalPopupComponent,
        AseCornerComponent,
        ContractsAndWarrantiesComponent,
        SystemDetailsWidgetComponent
    ],
    providers: [
        ActiveiqDataWrapper,
        SystemInventoryWrapper,
        ActiveiqService,
        BugSearchDataWrapper,
        BugSearchService,
        Constants,
        SpogUtils
    ]
})

export class WidgetsModule { }