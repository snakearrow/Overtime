import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WeekPage } from '../pages/week/week';
import { HomePage } from '../pages/home/home';
import { AlltimePage } from '../pages/alltime/alltime';
import { SettingsPage } from '../pages/settings/settings';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { GlobalProvider } from '../providers/global/global';

@NgModule({
  declarations: [
    MyApp,
    WeekPage,
    HomePage,
	AlltimePage,
	SettingsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WeekPage,
    HomePage,
	AlltimePage,
	SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider
  ]
})
export class AppModule {}
