import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comment } from '../models/Comment';
import { Job } from '../models/Job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  collectionName = 'Jobs';

  constructor(private afs: AngularFirestore) { }

  create(job: Job) {
    job.id = this.afs.createId();
    return this.afs.collection<Job>(this.collectionName).doc(job.id).set(job);
  }

  getAll() {
    return this.afs.collection<Job>(this.collectionName).valueChanges();
  }

  update(job: Job) {
    return this.afs.collection<Job>(this.collectionName).doc(job.id).set(job);
  }

  delete(id: string) {
    return this.afs.collection<Job>(this.collectionName).doc(id).delete();
  }


  //Complex query
  getJobWhichContainsUserAsApplicants(userEmail: string) {
    return this.afs.collection<Job>(this.collectionName, ref => ref.where('applicantsEmail','array-contains',userEmail).orderBy('date', 'asc')).valueChanges();
  }
}
