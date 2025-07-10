export enum DocType {
  form = "form",
  progressReport = "progress-report",
}

export enum ProgressReportStatus {
  Approved = "Approved",
  PendingSupervisorApproval = "Pending Supervisor Approval",
  NotStarted = "Not Started"
}

export interface ProgressReport {
  id: number;
  reportNumber: number;
  title: string;
  submittedOn: string;
  status: ProgressReportStatus;
  filename: string;
}

export interface Form {
  id: string;
  name: string;            
  type: string;           
  filename: string;      
}




