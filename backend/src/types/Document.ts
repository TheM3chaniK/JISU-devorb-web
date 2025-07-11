export enum DocType {
  form = "form",
  progressReport = "progress-report",
}

export enum ProgressReportStatus {
  Approved = 0,
  PendingSupervisorApproval = 1,
  rejected = 2,
  NotStarted = 3,
}

export const ProrgressReportStatusHumanReadable = {
  [ProgressReportStatus.Approved]: "Approved",
  [ProgressReportStatus.PendingSupervisorApproval]:
    "Pending Supervisor Approval",
  [ProgressReportStatus.rejected]: "Rejected",
  [ProgressReportStatus.NotStarted]: "Not Started",
};

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
