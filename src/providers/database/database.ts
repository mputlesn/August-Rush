import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Time } from '../../../node_modules/@angular/common';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(public http: HttpClient, public storage: SQLite) {
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "run2.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS runInfo (id INTEGER PRIMARY KEY AUTOINCREMENT, start TEXT, end TEXT, kilometers TEXT, duration TEXT)", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  CreateRunInFo(start:string, end:string, kilometers: string, duration:string){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO runInfo (start,end,kilometers,duration) VALUES (?, ?, ?, ?)";
      this.db.executeSql(sql, [start,end,kilometers,duration]).then((data) =>{
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  GetAllRuns(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM runInfo", []).then((data) => {
        let arrayRuns = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayRuns.push({
              id: data.rows.item(i).id,
              start: data.rows.item(i).start,
              end: data.rows.item(i).end,
              kilometers: data.rows.item(i).kilometers,
              duration: data.rows.item(i).duration
            });            
          }          
        }
        resolve(arrayRuns);
      }, (error) => {
        reject(error);
      })
    })
  }

}
