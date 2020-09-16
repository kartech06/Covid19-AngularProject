import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {GlobalDataSummary} from "../models/global-data";
import { DatewiseSummary } from '../models/Datewise';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  private BaseURL="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"
  private _url=""
  private Globaltimeurl="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
  date;
  month;
  year;
 private extension = ".csv"
  getdate(date: number)
  {
    if(date<10)
    {
      return '0'+date
    }
    return date;
  }
  constructor(private http: HttpClient) {
    let now=new Date()
    this.month=now.getMonth()+1
    this.year=now.getFullYear();
    this.date=now.getDate();
    console.log(
      {
        date: this.date,
        month: this.month,
        year: this.year
      }
    );
    this._url= `${this.BaseURL}${this.getdate(this.month)}-${this.getdate(this.date)}-${this.year}${this.extension}`;
    console.log(this._url);
        
   }

  countrywise()
  {
    return this.http.get(this.Globaltimeurl,{responseType: 'text'}).pipe(
      map(result=>{
        let rows = result.split('\n');
        // console.log(row);
        let mainData={};
        let header=rows[0];
        let dates = header.split(/,(?=\S)/)
        dates.splice(0,4);
        rows.splice(0,1);
        rows.forEach(row=>{
          let cols=row.split(/,(?=\S)/)
          let con=cols[1];
          cols.splice(0,4);
          mainData[con] = [];
          cols.forEach((value , index)=>{
            let dw: DatewiseSummary ={
              cases: +value,
              country: con , 
              date: new Date(Date.parse(dates[index]))
            }
            mainData[con].push(dw);
          })
          // cols.splice(0,1);
          // cols.splice(1,4);
          // cols.splice(2,4);
          // console.log(cols);
          
          
        })

        return mainData;
        
      }),
    )
  }

  global()
  {
   return this.http.get(this._url,{ responseType: 'text'}).pipe(
     map(result=>{
      let raw={};
       let rows=result.split('\n');
       rows.splice(0,1);
      //  console.log(rows[0]);
       rows.forEach(row=>{
         let cols=row.split(/,(?=\S)/)
        //  console.log(cols);
         let cs={
           country: cols[3],
           confirmed: +cols[7],
           deaths: +cols[8],
           recovered: +cols[9],
           active: +cols[10],
         }
         let temp: GlobalDataSummary = raw[cs.country];
         if(temp)
         {
           temp.active=cs.active + temp.active;
           temp.confirmed=cs.confirmed + temp.confirmed;
           temp.deaths=cs.deaths + temp.deaths;
           temp.recovered=cs.recovered + temp.recovered;

           raw[cs.country]=temp;
         }
         else{
           raw[cs.country]=cs;
         }
       })
      //  console.log(raw);
       
       return <GlobalDataSummary[]>Object.values(raw);
     }),
     catchError((error: HttpErrorResponse)=>
     {
       if(error.status == 404)
       {
         this.date=this.date-1;
         this._url= `${this.BaseURL}${this.getdate(this.month)}-${this.getdate(this.date)}-${this.year}${this.extension}`;
         console.log(this._url);
         
         return this.global()
       }
     })

   );
  }

}
