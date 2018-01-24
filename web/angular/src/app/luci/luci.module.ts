// module
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RoutingModule } from '../routing/routing.module';
import { WidgetsModule } from "../widgets/widgets.module";
import { SortablejsModule, SortablejsOptions } from 'angular-sortablejs';
import { OffClickModule } from 'angular2-off-click';
import { DragulaModule } from 'ng2-dragula';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { PipeModule } from '../components/pipe/pipe.module';

// Components
import { BrowserModule } from '@angular/platform-browser';
import { HeaderPublicComponent } from "./header/public/header-public.component";
import { HeaderSecureComponent } from "./header/secure/header-secure.component";
import { FooterComponent } from "./footer/footer.component";
import { NavigationComponent } from "./header/navigation/navigation.component";
import { HomeComponent } from "./pages/public-page/home/home.component";
import { DashboardComponent } from "./pages/secure-page/dashboard/dashboard.component";
import { DemoMongoComponent } from "./demo-mongo/demo-mongo.component";
import { FavouriteComponent } from './favourite/favourite.component';
import { NoticeComponent } from "app/luci/notice/notice.component";
import { SearchBarComponent } from "app/luci/header/search-bar/search-bar.component";
import { SpinnerComponent } from "app/components/spinner/spinner.component";
import { DashboardDataWrapper } from './pages/secure-page/dashboard/dashboard-data-wrapper';

// services
import { FavouriteService } from 'app/services/favourite/favourite.service';
import { NoticeService } from "app/services/notice/notice.service";
import { PreLoginService } from "app/services/pre-login/pre-login.service";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NavigationService } from "app/services/navigation/navigation.service";

// directive
import { DelayDragDirective } from "./pages/secure-page/dashboard/delay-drag.directive";
import { SystemDetailsComponent } from './pages/sub-page/system-details/system-details.component';


@NgModule({
    declarations: [
        HeaderPublicComponent,
        HeaderSecureComponent,
        FooterComponent,
        NavigationComponent,
        HomeComponent,
        DashboardComponent,
        FavouriteComponent,
        DemoMongoComponent,
        NoticeComponent,
        DelayDragDirective,
        SearchBarComponent,
        SpinnerComponent,
        SystemDetailsComponent
    ],
    imports: [
        WidgetsModule,
        RoutingModule,
        FormsModule,
        BrowserModule,
        SortablejsModule,
        OffClickModule,
        DragulaModule,
        InfiniteScrollModule,
        Ng2DeviceDetectorModule.forRoot(),
        PipeModule.forRoot()
    ],
    providers: [
        FavouriteService,
        NoticeService,
        PreLoginService,
        NavigationService,
        DashboardDataWrapper
    ],
    exports: [
        HeaderPublicComponent,
        HeaderSecureComponent,
        FooterComponent,
        NavigationComponent,
        HomeComponent,
        DashboardComponent,
        FavouriteComponent,
        DemoMongoComponent,
        NoticeComponent,
        DelayDragDirective,
        SearchBarComponent,
        SpinnerComponent
    ]
})

export class LuciModule{}