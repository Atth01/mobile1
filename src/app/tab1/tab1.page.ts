import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public photo: string = '';
  public name:string = '';
  public npm:string = '';
  public prodi:string = '';
  public code:string = '';
  public mail:string = '';
  public telp:string =  '';
  constructor(private storage: Storage) {
    this.getPhoto();
  }
  async getPhoto() {
    await this.storage.create();
    this.storage.get('isLoggedin').then((val) => {
      console.log(val);
      this.name = val.nama;
      this.npm = val.npm;
      this.prodi = val.prodi;
      this.photo=''
      this.code=''
      this.mail= val.email;
      this.telp = val.telp;
    });
  }
}
