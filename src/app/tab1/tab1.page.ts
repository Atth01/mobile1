import { Component } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Http } from '@capacitor-community/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public a: any;

  constructor(
    //private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.getUser();
  }

  async getUser(){
    await this.storage.create();
    this.storage.get('isLoggedIn').then((val)=>{
      this.a = Array(val);
    })
  }

  async logout() {
    this.storage.remove('isLoggedIn');
    localStorage.removeItem('isLoggedIn');
    this.navCtrl.navigateRoot(['/login']);
  }
}