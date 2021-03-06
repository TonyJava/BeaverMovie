import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, App } from 'ionic-angular';

import { SettingPage }  from '../setting/setting';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth/auth.service';
import { UserService } from '../../providers/user/user.service';
import { User } from '../../providers/user/user';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public appCtrl: App, public authService: AuthService,
              public userService: UserService, public toastCtrl: ToastController) {}

 ionViewWillEnter() {
   this.userService.getUser().subscribe((data) => {
     if (data.state == 'success') {
       let temp = data.data;
       if (temp.avatar == null) temp.avatar = 'assets/images/avatar.jpg';
       if (temp.phone == null) temp.phone = '未设定手机';
       this.user = new User(temp.username, temp.avatar, temp.phone);
     } else {
       if (data.message == '未登录')
         this.appCtrl.getRootNav().push(LoginPage);
       else
         this.presentToast(data.message);
     }
   });
 }

  // 显示 toast
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  gotoSetting() {
    this.navCtrl.push(SettingPage);
  }

  gotoLogin() {
    this.authService.signOut();
    this.appCtrl.getRootNav().push(LoginPage);
  }

}
