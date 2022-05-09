import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comment } from '../models/Comment';
import { Job } from '../models/Job';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  collectionName = 'Jobs';

  constructor(private afs: AngularFirestore, private userService: UserService, private authService: AuthService) { }


  create(job: Job) {
    job.id = this.afs.createId();
    return this.afs.collection<Job>(this.collectionName).doc(job.id).set(job);
  }

  //Complex query 2
  getAll() {
    return this.afs.collection<Job>(this.collectionName,ref => {
      return ref.orderBy('jobCreationTimestamp', 'desc');
    }).valueChanges();
  }

  update(job: Job) {
    return this.afs.collection<Job>(this.collectionName).doc(job.id).set(job);
  }

  delete(id: string) {
    return this.afs.collection<Job>(this.collectionName).doc(id).delete();
  }

  async applyJob(jobId: string){
    const loggedUserId = await this.authService.getLoggedUserId();
    const loggedUser = await this.userService.getById(loggedUserId ?? "").pipe(first()).toPromise();

    const currentJob = await this.afs.collection<Job>(this.collectionName).doc(jobId).get().pipe(first()).toPromise();
    const d = currentJob?.data();
    d?.applicantsEmail.push(loggedUser?.email ?? "");

    this.afs.collection<Job>(this.collectionName).doc(jobId).update(d!);
  }

  // Complex query
  // Visszatér azokkal az állásokkal amikre jelentkezett a [userEmail] felhasználó
  async getJobsOfLoggedUser() : Promise<Observable<Job[]>>{
    const loggedUserId = await this.authService.getLoggedUserId();
    const loggedUser = await this.userService.getById(loggedUserId ?? "").pipe(first()).toPromise();


    return this.afs.collection<Job>(this.collectionName, ref => ref.where('applicantsEmail','array-contains',loggedUser?.email)).valueChanges();
  }
}
