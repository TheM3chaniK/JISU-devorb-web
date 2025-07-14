export interface ProgressReport {
  id: number;
  title: string;
  status: string;
  date: string;
  document: string;
}

export interface ResearchSubmission {
  id: string;
  title: string;
  status: string;
  date: string;
  document: string;
}

export interface DSCMember {
  id: number;
  name: string;
  designation: string;
  department: string;
  email: string;
}

export interface Form {
  id: number;
  title: string;
  category: string;
  status: string;
  submittedDate: string;
  document: string;
}

export interface Scholar {
  id: number;
  name: string;
  department: string;
  enrollmentId: string;
  researchTopic: string;
  status: string;
  supervisor: { name: string; email: string };
  coSupervisor: { name: string; email: string };
  dscMembers: DSCMember[];
  progressReports: ProgressReport[];
  researchSubmissions: ResearchSubmission[];
  forms: Form[];
}

