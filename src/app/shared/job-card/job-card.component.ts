import { DateFormatPipe } from './../pipes/date-format.pipe';
import { CurrencyFormat } from './../pipes/currency-format.pipe';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Job } from '../models/Job';


@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit, OnChanges{
  @Input() job?: Job|null;

  constructor(public currencyFormat: CurrencyFormat, public dateFormat: DateFormatPipe) {
    console.log(this.job);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {

  }
}
