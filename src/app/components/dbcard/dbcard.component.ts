import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dbcard',
  templateUrl: './dbcard.component.html',
  styleUrls: ['./dbcard.component.css']
})
export class DbcardComponent implements OnInit {

  @Input("TotalConfirmed")
  TotalConfirmed;
  @Input("TotalDeaths")
  TotalDeaths;
  @Input("TotalActive")
  TotalActive;
  @Input("TotalRecovered")
  TotalRecovered;

  constructor() { }

  ngOnInit(): void {
  }

}
