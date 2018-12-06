import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	startButtonEnabled : boolean = true;
	pauseButtonEnabled : boolean = false;
	stopButtonEnabled : boolean = false;
	paused : boolean = false;
	substractPause : boolean = false;

	totalWorkTimeStr : string = "00:00:00";

	startTime : Date;
	pauseTime: Date;
	pauseStopTime : Date;
	stopTime : Date;
	workTime : Date;
	overTime : Date;

	startTimeStr : string = "";
	pauseTimeStr : string = "";
	stopTimeStr : string = "";
	workTimeStr : string = "";
	overTimeStr : string = "";

	workTimeUpdaterId : any;

  getDateString() {
	  return new Date().toISOString().slice(0, 10);
  }

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
	  public storage: Storage, public toastCtrl: ToastController, public settings: GlobalProvider) {
  }

  startButtonClicked() {
	console.log("startButtonClicked");
	this.pauseButtonEnabled = true;
	this.stopButtonEnabled = true;
	this.startButtonEnabled = false;

	if (!this.paused) {
		this.startTime = new Date();
		this.startTimeStr = this.startTime.toTimeString().split(' ')[0];

		this.workTimeUpdaterId = setInterval(() => {
			let now = new Date();
			if (!this.substractPause && !this.paused) {
				this.workTime = new Date(now.getTime() - this.startTime.getTime());
				this.workTimeStr = this.workTime.toUTCString().slice(17, 25);
			}
			else if (this.substractPause && !this.paused) {
				let diff = this.pauseStopTime.getTime() - this.pauseTime.getTime();
				let wtime = now.getTime() - this.startTime.getTime();
				this.workTime = new Date(wtime - diff);
				this.workTimeStr = this.workTime.toUTCString().slice(17, 25);
			}
		}, 1000);
	}
	else {
		this.pauseStopTime = new Date();
		this.pauseTimeStr = new Date(this.pauseStopTime.getTime() - this.pauseTime.getTime()).toUTCString().slice(17, 25);
		this.paused = false;
		this.substractPause = true;
	}
  }

  pauseButtonClicked() {
	console.log("pauseButtonClicked");
	this.pauseButtonEnabled = false;
	this.stopButtonEnabled = false;
	this.startButtonEnabled = true;

	this.paused = true;

	this.pauseTime = new Date();
	this.pauseTimeStr = this.pauseTime.toTimeString().split(' ')[0];
  }

  stopButtonClicked() {
	console.log("stopButtonClicked");
	this.pauseButtonEnabled = false;
	this.stopButtonEnabled = false;
	this.startButtonEnabled = true;

	this.stopTime = new Date();
	this.stopTimeStr = this.stopTime.toTimeString().split(' ')[0];

	// calculate overtime
	let overTimeSec = this.workTime.getTime() - this.settings.totalWorkTime * 1000;
	if (overTimeSec < 0) {
		this.overTime = null;
		this.overTimeStr = "00:00:00";
	}
	else {
		this.overTime = new Date(overTimeSec);
		this.overTimeStr = this.overTime.toUTCString().slice(17, 25);
	}

	clearInterval(this.workTimeUpdaterId);

	const confirm = this.alertCtrl.create({
		title: 'Save',
		message: 'Do you want to save todays\' work time permanently?',
		buttons: [
			{
				text: "Yes",
				handler: () => {
					console.log("save data");
					let key = this.getDateString();
					let value = this.workTimeStr + "," + this.pauseTimeStr + "," + this.overTimeStr;
					console.log(key + "=" + value);
					this.storage.set(key, value);
					// add to overtime
					let ot = this.settings.totalOverTime; // total over time in seconds so far
					// do we have over time today ?
					if (this.overTime) {
						ot = ot + this.overTime.getTime()/1000;
						console.log("new overtime: " + ot);
						this.settings.totalOverTime = ot;
						this.storage.set("totalOverTime", ot);
					}
					// if not, substract from overtime
					else {
						let diff = (this.settings.totalWorkTime - this.workTime.getTime()/1000);
						this.settings.totalOverTime -= diff;
						console.log("new overtime: " + this.settings.totalOverTime);
						this.storage.set("totalOverTime", this.settings.totalOverTime);
					}
				}
			},
			{
				text: "No"
			}
		]
	});
	confirm.present();
  }

  sickButtonClicked() {
	  const confirm = this.alertCtrl.create({
	  	title: 'Call in sick',
	  	message: 'Do you want to call in sick today?',
	  	buttons: [
	  		{
	  			text: "Yes",
	  			handler: () => {
					this.storage.get("totalSickDays").then((val) => {
						if (val) {
							this.settings.totalSickDays += 1;
							this.storage.set("totalSickDays", this.settings.totalSickDays);
						}
						else {
							this.storage.set("totalSickDays", 1);
							this.settings.totalSickDays = 1;
						}
					});
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
