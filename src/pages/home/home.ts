import { Component} from '@angular/core';
import { NavController, Platform, AlertController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherProvider } from '../../providers/weather/weather';
import { HistoryPage } from '../history/history';
import { RoutePage } from '../route/route';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // @ViewChild('map') mapRef: ElementRef;
  // map: any;
  temp: string;
  place: string;
  lat: number;
  lon: number;
  constructor(public navCtrl: NavController, private geo: Geolocation, private platform: Platform, private weather: WeatherProvider, public alertCtrl: AlertController) {
    
    
  }

  ionViewDidLoad(){
    this.showMap()
    
  }

  showMap(){

    this.geo.getCurrentPosition().then((position) => {
      
      //location
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;    
      
      //const location = new google.maps.LatLng(this.lat, this.lon);

      //map options
      // const options = {
      //   center: location,
      //   zoom: 17,
      //   streetViewControl: false,
      //   mapTypeId: 'satellite'
      // }

      // this.map = new google.maps.Map(this.mapRef.nativeElement, options);
      // this.addMarker()

      this.weather.getWeather(this.lat,this.lon).then((data:any) =>{
        console.log(data);
          this.temp = (data.main.temp - 273.15).toFixed(0) + "°c";
          this.place = data.name;
          if(this.place == ""){
            this.place = "Name Unknown"
          }
          console.log(this.temp);
          console.log(this.place);
    })
    
    }),(err) => {
      console.log(err);
    }
   
  }

  // addMarker(){
 
  //   let marker = new google.maps.Marker({
  //     map: this.map,
  //     animation: google.maps.Animation.DROP,
  //     position: this.map.getCenter()
  //   });
   
  //   let content = "<h4>Information!</h4>";         
   
  //   //this.addInfoWindow(marker, content);
   
  // }

  route(){
    const prompt = this.alertCtrl.create({
        title: 'SET ROUTE',
        inputs: [
          {
            name: 'destination',
            placeholder: 'Destination'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Confirm',
            handler: data => {
              var destination  = {
                destination : data.destination
              }
              this.navCtrl.push(RoutePage, destination);
            }
          }
        ]
      });
      prompt.present();
  }

  history(){
    alert('fgdh');
    this.navCtrl.push(HistoryPage);
  }

  // addInfoWindow(marker, content){
 
  //   let infoWindow = new google.maps.InfoWindow({
  //     content: content
  //   });
   
  //   google.maps.event.addListener(marker, 'click', () => {
  //     infoWindow.open(this.map, marker);
  //   });
   
  // }

}
