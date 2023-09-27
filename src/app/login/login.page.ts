import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  NavController,
  ToastController,
  LoadingController,
} from '@ionic/angular';

//import axios from 'axios;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username: string = '';
  public password: string = '';
  constructor(
    private navCtrl: NavController,
    private toasCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) {}

  ngOnInit() {}
  async presentToast(a: any) {
    const toast = await this.toasCtrl.create({
      message: a,
      duration: 1500,
      color: 'danger',
      position: 'top',
    });
    toast.present();
  }
  async login() {
    if (this.username === '' || this.password === '') {
      this.presentToast('Username and Password cannot be empty !');
    } else {
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      loader.present();
      try {
        const storage = await this.storage.create();
        let url = 'http://localhost/api/login.php';
        fetch(url,{
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
           },
          body: JSON.stringify({
            username: this.username,
            pass: this.password,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.error === false) {
              loader.dismiss();
              storage.set('isLoggedIn', res.result);
              localStorage.setItem('isLoggedIn', res.result);
              this.navCtrl.navigateRoot(['/tabs/tab1']);
            } else {
              loader.dismiss();
              this.presentToast(res.message);
            }
          });
      } catch (err) {
        loader.dismiss();
        this.presentToast('Something went wrong!');
      }
    }
  }
  register() {
    this.navCtrl.navigateForward('/register');
  }
}