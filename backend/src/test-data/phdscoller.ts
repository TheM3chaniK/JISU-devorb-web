import { AcademicProfile } from "@/types/AcademicProfile.js";
import { ProgressReportStatus } from "@/types/Document.js";

export const AcademicProfiles: AcademicProfile[] = [
  {
    id: 1,
    name: "Alice Johnson",
    department: "Computer Science",
    enrollmentId: "CS2025001",
    researchTopic: "Artificial Intelligence in Healthcare",
    status: "Active",
    supervisor: {
      name: "Dr. Emily Smith",
      email: "emily.smith@university.edu",
    },
    coSupervisor: {
      name: "Dr. John Doe",
      email: "john.doe@university.edu",
    },
    dscMembers: [
      {
        id: 1,
        name: "Prof. Michael Brown",
        designation: "Professor",
        department: "Computer Science",
        email: "michael.brown@university.edu",
      },
      {
        id: 2,
        name: "Prof. Sarah Lee",
        designation: "Associate Professor",
        department: "Information Technology",
        email: "sarah.lee@university.edu",
      },
      {
        id: 3,
        name: "Dr. David Miller",
        designation: "Assistant Professor",
        department: "Data Science",
        email: "david.miller@university.edu",
      },
    ],
    progressReports: [
      {
        id: 1,
        title: "Progress Report Q1 2025",
        status: ProgressReportStatus.Approved,
        submittedOn: "2025-03-15",
        filename: "q1-2025.pdf",
        reportNumber: 0,
      },
    ],
    researchSubmissions: [
      // {
      //   id: "sub-001",
      //   title: "Literature Review Submission",
      //   status: "Approved",
      //   date: "2025-02-01",
      //   document: "/docs/submissions/lit-review.pdf",
      // },
      // {
      //   id: "sub-002",
      //   title: "Thesis Draft Submission",
      //   status: "Under Review",
      //   date: "2025-07-10",
      //   document: "/docs/submissions/thesis-draft.pdf",
      // },
    ],
    forms: [
      // {
      //   id: 1,
      //   title: "Research Ethics Form",
      //   category: "Declaration",
      //   status: "Submitted",
      //   submittedDate: "2025-01-10",
      //   document: "/docs/forms/ethics-form.pdf",
      // },
      // {
      //   id: 2,
      //   title: "Annual Enrollment Form",
      //   category: "Enrollment",
      //   status: "Approved",
      //   submittedDate: "2025-01-05",
      //   document: "/docs/forms/enrollment-form.pdf",
      // },
    ],
  },
];
