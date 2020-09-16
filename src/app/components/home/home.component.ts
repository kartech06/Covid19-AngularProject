import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { GlobalDataSummary } from 'src/app/models/global-data';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  TotalConfirmed=0;
  TotalActive=0;
  TotalDeaths=0;
  TotalRecovered=0;
  datatable=[];
  globalData : GlobalDataSummary[];
  chart = {
    PieChart : "PieChart",
    ColumnChart : "ColumnChart",
    height:500,
    options: {
      animation:{
        duration:1000,
        easing:"out",
      },
      is3D: true
    }
  }
  constructor(private fetch: FetchService) { }


  ngOnInit(): void {

    this.fetch.global().subscribe(
      data => {       
        this.globalData=data;
        console.log("Successfull",data);
        data.forEach(res=>
          {
            if(!Number.isNaN(res.confirmed))
            {
            this.TotalActive+=res.active;
            this.TotalConfirmed+=res.confirmed;
            this.TotalDeaths+=res.deaths;
            this.TotalRecovered+=res.recovered;}
          }) 
        this.initChart("c"); 
        
        },
      error => {
        console.log("error",error);
      }  
    )

  }

  updateChart(input: HTMLInputElement)
  {
    // console.log(input.value);
    this.initChart(input.value);    
  }

  initChart(caseType: string)
  {
    this.datatable=[];
    // this.datatable.push(["Country" , "Cases"])
    this.globalData.forEach(res=>
      {
        let value: number;

        if(caseType=='c')
         if(res.confirmed>2000)
          value=res.confirmed;

        if(caseType=='d')
         if(res.deaths>2000)
          value=res.deaths;

        if(caseType=='r')
         if(res.recovered>2000)  
          value=res.recovered;

        if(caseType=='a')
         if(res.active>2000)
          value=res.active;      
        
        this.datatable.push([res.country,value]);        

      })      
      console.log(this.datatable);
      // this.pieChart = {
      //   chartType: 'PieChart',
      //   dataTable: datatable,
      //   //firstRowIsData: true,
      //   options: {height : 500},       
      // };
      // this.columnChart = {
      //   chartType: 'ColumnChart',
      //   dataTable: datatable,
      //   //firstRowIsData: true,
      //   options: {height : 500},
      // };
          
  }

}
