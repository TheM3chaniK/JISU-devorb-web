import { Form, ProgressReport } from "@/types/Document.js";
import { ProgressReportStatus } from "@/types/Document.js";

export const forms: Form[] = [
  {
    id: "1",
    name: "Application Form",
    type: "Admission and Enrollment Documents",
    filename: "application_form.pdf",
  },
  {
    id: "2",
    name: "Initial Enrollment Form",
    type: "Admission and Enrollment Documents",
    filename: "initial_enrollment.pdf",
  },
  {
    id: "3",
    name: "Identity Verification Form",
    type: "Identity Documents",
    filename: "identity_verification.pdf",
  },
  {
    id: "4",
    name: "Personal ID Declaration",
    type: "Identity Documents",
    filename: "personal_id_declaration.pdf",
  },
  {
    id: "5",
    name: "Previous Education Certificate",
    type: "Academic Documents",
    filename: "education_certificate.pdf",
  },
  {
    id: "6",
    name: "Transcript Submission",
    type: "Academic Documents",
    filename: "transcript_submission.pdf",
  },
  {
    id: "7",
    name: "Student Declaration Form",
    type: "Declaration Forms",
    filename: "student_declaration.pdf",
  },
  {
    id: "8",
    name: "Undertaking Form",
    type: "Declaration Forms",
    filename: "undertaking_form.pdf",
  },
  {
    id: "9",
    name: "Supervisor Nomination Form",
    type: "Supervisor and Committee Formation Documents",
    filename: "supervisor_nomination.pdf",
  },
  {
    id: "10",
    name: "Supervisor Approval Form",
    type: "Supervisor and Committee Formation Documents",
    filename: "supervisor_approval.pdf",
  },
  {
    id: "11",
    name: "Co-Supervisor Nomination Form",
    type: "Supervisor and Committee Formation Documents",
    filename: "co_supervisor_nomination.pdf",
  },
  {
    id: "12",
    name: "Co-Supervisor Approval Form",
    type: "Supervisor and Committee Formation Documents",
    filename: "co_supervisor_approval.pdf",
  },
  {
    id: "13",
    name: "DSC Constitution Form",
    type: "Supervisor and Committee Formation Documents",
    filename: "dsc_constitution.pdf",
  },
  {
    id: "14",
    name: "Course Registration Form",
    type: "Course Work and Registration Documents",
    filename: "course_registration.pdf",
  },
  {
    id: "15",
    name: "Course Completion Certificate",
    type: "Course Work and Registration Documents",
    filename: "course_completion_certificate.pdf",
  },
  {
    id: "16",
    name: "Research Proposal Registration Form",
    type: "Course Work and Registration Documents",
    filename: "research_proposal_registration.pdf",
  },
  {
    id: "17",
    name: "Academic Credit Transfer Application",
    type: "Course Work and Registration Documents",
    filename: "credit_transfer_application.pdf",
  },
  {
    id: "18",
    name: "Credit Transfer Approval",
    type: "Course Work and Registration Documents",
    filename: "credit_transfer_approval.pdf",
  },
];

export const progressReports: ProgressReport[] = [
  {
    id: 1,
    reportNumber: 1,
    title: "Progress Report 1",
    submittedOn: "2024-05-10",
    status: ProgressReportStatus.Approved,
    filename: "sample-1.pdf",
  },
  {
    id: 2,
    reportNumber: 2,
    title: "Progress Report 2",
    submittedOn: "2024-11-12",
    status: ProgressReportStatus.Approved,
    filename: "a8586d00919b8f36d319e6a5987696d8.pdf",
  },
  {
    id: 3,
    reportNumber: 3,
    title: "Progress Report 3",
    submittedOn: "2025-02-05",
    status: ProgressReportStatus.PendingSupervisorApproval,
    filename: "sample-1.pdf",
  },
];

