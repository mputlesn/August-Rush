import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

 public ListRuns : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider) {
  
  }

  ionViewDidLoad() {

    this.database.GetAllRuns().then((data: any) => {
      console.log(data);
      this.ListRuns = data;
      console.log(this.ListRuns);
      
    }, (error) => {
      console.log(error);
    })

    console.log('ionViewDidLoad HistoryPage');
  }



}
