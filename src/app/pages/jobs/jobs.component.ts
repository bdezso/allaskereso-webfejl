import { JobService } from './../../shared/services/job.service';
import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/models/Job';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  public jobs : Observable<Job[]>|null;
  constructor(public jobService: JobService) {
    this.jobs = this.jobService.getAll();
  }

  ngOnInit(): void {
    
  }
}
