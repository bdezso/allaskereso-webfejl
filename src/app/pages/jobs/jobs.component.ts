import { AuthService } from './../../shared/services/auth.service';
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

  public jobsOfLoggedUser : Job[] = [];

  constructor(public jobService: JobService, private authService: AuthService) {
    this.jobs = this.jobService.getAll();
  }

  ngOnInit(): void {
    this.jobService.getJobsOfLoggedUser().then((obs)=>{
      obs.subscribe(jobs => {
        this.jobsOfLoggedUser = jobs;
      });
    });
  }
}
