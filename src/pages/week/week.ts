import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-week',
  templateUrl: 'week.html'
})
export class WeekPage {

	weekOfYear : number = 0;
	weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	workTimeMonday: string; pauseTimeMonday: string; overTimeMonday: string;
	workTimeTuesday: string; pauseTimeTuesday: string; overTimeTuesday: string;
	workTimeWednesday: string; pauseTimeWednesday: string; overTimeWednesday: string;
	workTimeThursday: string; pauseTimeThursday: string; overTimeThursday: string;
	workTimeFriday: string; pauseTimeFriday: string; overTimeFriday: string;

  constructor(public navCtrl: NavController, public storage : Storage, public toastCtrl: ToastController) {
	  let now = new Date();
	  let onejan = new Date(now.getFullYear(), 0, 1);
	  this.weekOfYear = Math.ceil( (((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7 );
	  this.getWorkTimes();
  }

  	isToday(day) {
		return new Date().getDay() == day;
  	}

	getCardCaption(day) {
	  let d = new Date();
	  let diff = d.getDate() - d.getDay() + (d.getDay() == 0 ? -6 : 1) + day
	  let ret = new Date(d.setDate(diff));
	  return this.weekDays[d.getDay()] + ", " + ret.toISOString().slice(0, 10);
  	}

	getStorageKey(day) {
	  let d = new Date();
	  let diff = d.getDate() - d.getDay() + (d.getDay() == 0 ? -6 : 1) + day
	  let ret = new Date(d.setDate(diff));
	  return ret.toISOString().slice(0, 10);
  	}

	getWorkTimes() {
		console.log("getWorkTimes()");
		this.storage.get(this.getStorageKey(0)).then(val => {
			if (val) {
				let values = val.split(',');
				this.workTimeMonday = values[0];
				this.pauseTimeMonday = values[1];
				this.overTimeMonday = values[2];
			}
		});
		this.storage.get(this.getStorageKey(1)).then(val => {
			if (val) {
				let values = val.split(',');
				this.workTimeTuesday = values[0];
				this.pauseTimeTuesday = values[1];
				this.overTimeTuesday = values[2];
			}
		});
		this.storage.get(this.getStorageKey(2)).then(val => {
			if (val) {
				let values = val.split(',');
				this.workTimeWednesday = values[0];
				this.pauseTimeWednesday = values[1];
				this.overTimeWednesday = values[2];
			}
		});
		this.storage.get(this.getStorageKey(3)).then(val => {
			if (val) {
				let values = val.split(',');
				this.workTimeThursday = values[0];
				this.pauseTimeThursday = values[1];
				this.overTimeThursday = values[2];
			}
		});
		this.storage.get(this.getStorageKey(4)).then(val => {
			if (val) {
				let values = val.split(',');
				this.workTimeFriday = values[0];
				this.pauseTimeFriday = values[1];
				this.overTimeFriday = values[2];
			}
		});
  }

  ionViewDidEnter() {
	  this.getWorkTimes();
  }

}
