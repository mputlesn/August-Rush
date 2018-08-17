import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoryPage } from '../history/history';
import { DatabaseProvider } from '../../providers/database/database';
import { Time } from '../../../node_modules/@angular/common';
/**
 * Generated class for the TimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage implements OnInit{

  start: string = this.navParams.get('locStart');
  end: string = this.navParams.get('destination');
  kilometers: string = this.navParams.get('distance');
  duration: string;
  

  sec: number = 0;
  min: number = 0;
  hrs: number = 0;
  timerObj;

  btnPause = "Pause";

  intervalVar;
  
  obj ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider) {
    this.startTimer();
  }

  ngOnInit(){
    this.obj=this.navParams.get('Obj');
    console.log(this.obj);
    
    console.log(this.navParams.get('Obj'));
    
  }

  ionViewDidLoad() {

  }

  startTimer(){
    this.intervalVar = setInterval(function(){
      this.sec++
      if(this.sec  == 60){
        this.min++
        this.sec = 0;
        if(this.min == 60){
          this.hrs++
          this.min = 0;
        }
      }
    }.bind(this), 1000)
  }

  stop(){
    clearInterval(this.intervalVar);
    this.duration = this.hrs+':'+this.min+':'+this.sec;
    this.database.CreateRunInFo(this.start,this.end,this.kilometers,this.duration).then((data) => {
    this.navCtrl.push(HistoryPage);
    alert('data stored');
    }, (error) => {
      console.log(error);
    })
  
  }

  pause(){
    console.log(this.start);
    console.log(this.end);
    console.log(this.kilometers);

    if(this.btnPause  == "Pause"){
      this.timerObj = {
        secTemp: this.sec,
        minTemp: this.min,
        hrsTemp: this.hrs
      }
      clearInterval(this.intervalVar);
      this.btnPause = "Continue"
    }else
    if(this.btnPause  == "Continue")
    {
      this.intervalVar = setInterval(function(){
        this.sec = this.timerObj.secTemp++
        if(this.sec  == 60){
          this.min = this.timerObj.minTemp++
          this.sec = 0;
          if(this.min == 60){
            this.hrs = this.timerObj.hrsTemp++
            this.min = 0;
          }
        }
      }.bind(this), 1000)
      this.btnPause = "Pause"
    }
  }

}
