import { Component } from '@angular/core';

import { WeekPage } from '../week/week';
import { HomePage } from '../home/home';
import { AlltimePage } from '../alltime/alltime';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = WeekPage;
  tab3Root = AlltimePage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
