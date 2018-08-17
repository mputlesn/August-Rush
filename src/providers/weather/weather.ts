import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
  }

  getWeather(lon, lat){
    let API: string = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=efe266db60c305230e50211be2a29ed9'
    return new Promise ((resolve, reject) => {
      this.http.get(API).subscribe(data =>{
         resolve(data);
         console.log(data);
      })
   });
  }

}
