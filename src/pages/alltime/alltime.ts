import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-contact',
  templateUrl: 'alltime.html'
})
export class AlltimePage {

	totalOverTimeStr : string = "";
	totalSickDays : number = 0;

  constructor(public navCtrl: NavController, public settings: GlobalProvider) {
  }

  padZero(value) {
	  if (value < 9) {
		  return "0" + value;
	  }
	  return value.toString();
  }

  ionViewDidEnter() {
	  this.totalSickDays = this.settings.totalSickDays;
	  let ot = this.settings.totalOverTime; // total over time in seconds
	  if (ot <= 0) {
		  this.totalOverTimeStr = "00:00";
	  }
	  else {
		  let seconds = ot % 60;
		  let minutes = ot / 60 % 60;
		  let hours = Math.trunc(ot / 60 / 60);
		  this.totalOverTimeStr = this.padZero(hours) + ":" + this.padZero(minutes) + ":" + this.padZero(seconds);
	  }
  }

}
