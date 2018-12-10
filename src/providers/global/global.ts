import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class GlobalProvider {

	public totalWorkTime : number = (7 * 60 + 15) * 60;
	public overTimeOffset : number = 0;

	public totalSickDays : number = 0;
	public totalOverTime : number = 0;

	public constructor(public storage: Storage) {
		// load settings from database

		this.storage.get("settings.totalWorkTime").then((val) => {
			if (val) {
				this.totalWorkTime = val;
			}
			else {
				this.storage.set("settings.totalWorkTime", this.totalWorkTime);
			}
		});

		this.storage.get("settings.overTimeOffset").then((val) => {
			this.overTimeOffset = val;
		});

		this.storage.get("totalSickDays").then((val) => {
			if (val) {
				this.totalSickDays = val;
			}
			else {
				this.storage.set("totalSickDays", 0);
			}
		});

		this.storage.get("totalOverTime").then((val) => {
			if (val) {
				this.totalOverTime = val;
			}
			else {
				this.storage.set("totalOverTime", 220500);
			}
		});
	}

	// resets all values, called from settings when reset button clicked
	public init() {
		this.storage.set("settings.totalWorkTime", this.totalWorkTime);
		this.storage.set("settings.overTimeOffset", 0);
		this.storage.set("totalSickDays", 0);
		this.storage.set("totalOverTime", 220500);
	}

}
