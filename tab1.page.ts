import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery List";
  items: any[];
  errorMessage: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, 
                public alertCtrl: AlertController, private dataService: GroceriesServiceService,
                public inputDialogService: InputDialogServiceService,
                public socialSharing: SocialSharing) {
    this.dataService.dataChanged$.subscribe((dataChanged: boolean) => {
        this.loadItems();
    });

    this.items = [];
    this.loadItems();
}

  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems() {
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
      
  }

  removeItem(item: any) {
    this.dataService.removeItem(item._id)
      .subscribe((success: any) => {
        if (success) {
          console.log('Item successfully deleted');
        } else {
          console.log('Error deleting item');
        }
      });
  }

  async shareItem(item: any, index: any) {
    console.log("Sharing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: "Sharing Item - " + index + " ...",
      duration: 3000
    });
    toast.present();

   let message = "Grocery Item - Name :" + item.name + " - Quantity" + item.quantity;
   let subject = "Shared via Groceries app";

   try {
    this.socialSharing.share(message, subject);
    console.log("Shared successfully!");
  } catch (error) {
    console.error("Error while sharing", error);
  }
}

  async editItem(item: any, index: any) {
    console.log("Editing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: "Editing Item - " + index + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);

  }

  async addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }
}