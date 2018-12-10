import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

	public totalWorkTimeStr : string = "";
	public overTimeOffsetStr : string = "00:00";

  constructor(public navCtrl: NavController, public navParams: NavParams,
	  public settings: GlobalProvider, public storage : Storage, public alertCtrl: AlertController) {
		  this.totalWorkTimeStr = new Date(this.settings.totalWorkTime*1000).toUTCString().slice(17, 25);
		  this.overTimeOffsetStr = new Date(this.settings.overTimeOffset*1000).toUTCString().slice(17, 25);
  }

  totalWorkTimeChanged(wTime) {
	  // save
	  let d = new Date('01/01/1970 ' + this.totalWorkTimeStr);
	  d = new Date(d.getTime() - d.getTimezoneOffset()*60*1000);
	  this.settings.totalWorkTime = d.getTime() / 1000;
	  this.storage.set("settings.totalWorkTime", this.settings.totalWorkTime);
  }

  overTimeOffsetChanged(offset) {
	  let d = new Date('01/01/1970 ' + this.overTimeOffsetStr);
	  d = new Date(d.getTime() - d.getTimezoneOffset()*60*1000);
	  this.settings.overTimeOffset = d.getTime() / 1000;
	  this.storage.set("settings.overTimeOffset", this.settings.overTimeOffset);
	  this.settings.totalOverTime += this.settings.overTimeOffset;
	  this.storage.set("totalOverTime", this.settings.totalOverTime);
  }

  resetButtonClicked() {
	  const confirm = this.alertCtrl.create({
	  	title: 'Reset all data',
	  	message: 'Reset deletes all saved data. Continue?',
	  	buttons: [
	  		{
	  			text: "Yes",
	  			handler: () => {
					this.storage.clear();
					this.settings.init();
	  			}
	  		},
	  		{
	  			text: "No"
	  		}
	  	]
	  });
	  confirm.present();
  }
}
