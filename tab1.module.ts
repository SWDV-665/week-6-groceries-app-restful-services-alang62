import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    HttpClientModule
  ],
  declarations: [Tab1Page],
  providers: [SocialSharing,
    GroceriesServiceService,
    HttpClient,
    InputDialogServiceService
  ],
})
export class Tab1PageModule {}