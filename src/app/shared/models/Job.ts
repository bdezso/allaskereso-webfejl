export interface Job {
  id: string;
  jobName: string;
  jobCreatorEmail: string;
  salaryPerMonth: number;
  tasks: string;
  applicantsEmail: string[];
  jobCreationTimestamp: number;
}