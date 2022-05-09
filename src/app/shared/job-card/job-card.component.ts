import { DateFormatPipe } from './../pipes/date-format.pipe';
import { CurrencyFormat } from './../pipes/currency-format.pipe';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Job } from '../models/Job';
import { JobService } from '../services/job.service';


@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit, OnChanges{
  @Input() job?: Job|null;

  constructor(public currencyFormat: CurrencyFormat, public dateFormat: DateFormatPipe, private jobService: JobService) {
    console.log(this.job);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  async onApply(){
    console.log("called");
    
    try{
      await this.jobService.applyJob(this.job!.id);
    }catch(e){
      console.log("Jelentkezés shit");
    }
    
    console.log("Sikeres");
  }

  ngOnInit(): void {

  }
}
