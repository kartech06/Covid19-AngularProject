import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DatewiseSummary } from 'src/app/models/Datewise';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private fetch: FetchService) { }
  TotalConfirmed=0;
  TotalActive=0;
  TotalDeaths=0;
  TotalRecovered=0;
  dateWisedata;
  datatable=[];
  chart ={
    LineChart: 'LineChart',
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: "out",
      },
    },
  }
  result : GlobalDataSummary[];
  country=[];
  selectedCountryData: DatewiseSummary[];
  // lineChart: GoogleChartInterface = {
  //   chartType: 'LineChart',

  // }

  ngOnInit(): void {    

    this.fetch.countrywise().subscribe(
      data=>{
        this.dateWisedata=data;     
        // console.log(data);
        this.UpdateChart();
      },
      error=>{
        console.log("Error",error);
        
      }
    )

    this.fetch.global().subscribe(
      data=>{
        this.result=data;
        data.forEach(res=>
          {
            this.country.push(res.country);
          })
      }
    )

  }

  UpdateChart()
  {
    this.datatable=[];
    // this.datatable.push(["Cases","Date"])
    this.selectedCountryData.forEach(res=>{
      this.datatable.push([res.cases , res.date]);
    })
    console.log(this.datatable);
  }

  Update(count: string)
  {
    console.log(count);
    this.result.forEach(res=>
      {
        if(res.country==count)
        {
          this.TotalActive=res.active;
          this.TotalConfirmed=res.confirmed;
          this.TotalDeaths=res.deaths;
          this.TotalRecovered=res.recovered;
        }
      })
    this.selectedCountryData = this.dateWisedata[count];
    // console.log(this.selectedCountryData);
    this.UpdateChart();
    
  }


}
