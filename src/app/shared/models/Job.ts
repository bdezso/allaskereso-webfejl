export interface Job {
  jobName: string;
  id: string,
  jobCreatorEmail: string;
  salaryPerMonth: number;
  tasks: string;
  applicantsEmail: string[];
  jobCreationTimestamp: number;
}