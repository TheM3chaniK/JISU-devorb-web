export interface AcademicProfile {
  id: number;
  enrollmentId: string;
  name: string;
  department: string;
  researchTopic: string;
  supervisor: string;
  coSupervisor?: string;
  dscMembers: string[];
}
