import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TimerPage } from '../timer/timer';

declare var google: any;

/**
 * Generated class for the RoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
})
export class RoutePage {

  @ViewChild('map') mapRef: ElementRef;
  map: any;
  lat: number;
  lon: number;
  destinationName:string = this.navParams.get('destination');
  Obj : any;
  distance: any;
  locationAddress: any;
  locationAddressStr:string;
  desLatLng;
  loca: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private geo: Geolocation, private platform: Platform) {
    this.showMap();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutePage');
    
  }

  showMap(){
    this.geo.getCurrentPosition().then((position) => {

      //declaring google map services
      const directionsService = new google.maps.DirectionsService;
      const directionsDisplay = new google.maps.DirectionsRenderer;
      const geocoder = new google.maps.Geocoder;
      const service = new google.maps.DistanceMatrixService();
    
      //current location coordinates
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;    
      
      this.loca = new google.maps.LatLng(this.lat, this.lon);

      console.log("Location "+ this.loca);
      
      //map options
      const options = {
        center: location,
        zoom: 17,
        streetViewControl: false,
        mapTypeId: 'satellite'
      }

      //showing the map 
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
      this.addMarker();
      directionsDisplay.setMap(this.map);

      //calling method to display route from a to b
      this.calculateAndDisplayRoute(this.loca,directionsDisplay,directionsService);

      //calling method to return current location address
      this.locationAddress = this.geocodeLatLng(geocoder,this.loca);
      console.log(this.locationAddress);
      
     //calling method to give us the coordinates of the destination
      this.geocodeAddress(geocoder);
      
      //getting distance and calling the callback method
      service.getDistanceMatrix(
        {
          origins: [this.loca],
          destinations: [this.destinationName],
          travelMode: 'WALKING'
        }, (response, status) => {
          if (status == 'OK') {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
        
            for (var i = 0; i < origins.length; i++) {
              var results = response.rows[i].elements;
              for (var j = 0; j < results.length; j++) {
                var element = results[j];
                this.distance = element.distance.text;
                console.log(this.distance);
              }
            }
          }
      });
    
    }),(err) => {
      console.log(err);
    }

    console.log("distance core : "+this.distance);
    
  }

  

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    //let content = "<h4>Information!</h4>";         
   
    //this.addInfoWindow(marker, content);
   
  }

  //calculating route
  calculateAndDisplayRoute(location, directionsDisplay,directionsService) {
    directionsService.route({
      origin: location,
      destination: this.destinationName,
      travelMode: 'WALKING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  //getting address from coordinates
  geocodeLatLng(geocoder,location) {
    return new Promise ((resolve, reject) => {
      geocoder.geocode({'location': location}, function(results, status) {
        if (status === 'OK') {
          let locName = results[0].formatted_address;
          let locStart = locName.split(",");
          this.locationAddress = locStart[0];
          console.log(locStart);
          console.log("Location Push:"+this.locationAddress);
        } else {
          window.alert('Geocoder failed due to: ' + status);
        } resolve(this.locationAddress);
      }, (error) => {
        reject(error);
      });
    });
  }

  //getting coordinates from address
  geocodeAddress(geocoder) {
    geocoder.geocode({'address': this.destinationName}, function(results, status) {
      if (status === 'OK') {
       this.desLatLng = results[0].geometry.location;
       console.log("Des method "+this.desLatLng);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  //getting distance between Start and End point
  // callback(response, status) {
  //     if (status == 'OK') {
  //       var origins = response.originAddresses;
  //       var destinations = response.destinationAddresses;
    
  //       for (var i = 0; i < origins.length; i++) {
  //         var results = response.rows[i].elements;
  //         for (var j = 0; j < results.length; j++) {
  //           var element = results[j];
  //           this.distance = element.distance.text;
  //           console.log(this.distance);
  //         }
  //       }
  //     }
  // }
  
  //pushing your object to the timer page
 start(){

 // alert(this.locationAddress2.t. __zone_symbol__value)
  console.log(this.locationAddress);
  console.log(this.distance);
  this.locationAddressStr = this.locationAddress.__zone_symbol__value;
  let aa = new Obj(this.distance, this.locationAddressStr, this.destinationName);
  console.log(aa);
  
  
  this.navCtrl.push(TimerPage, {Obj:aa});

    // console.log('Location = '+this.locationAddress);
    // console.log('Distance ='+this.distance);
    // console.log("Object DAta "+ this.Obj);

  } 

}

export class Obj {

  distance: string;
  location: string;
  destination: string;
  constructor( distance: string, location: string, destination: string){
    this.destination = destination;
    this.distance = distance;
    this.location = location;
  }
}

