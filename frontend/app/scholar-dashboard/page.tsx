"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import ProgressReports from "./ProgressReports";
import PreThesisCard from "./PreThesisCard";
import FinalThesisCard from "./FinalThesisCard";
import FormsTab from "./FormsTab";
import FeeTab from "./FeeTab";
import OverviewTab from "./OverviewTab";
import StatusBadge from "../components/StatusBadge";
import DashboardHeader from "../components/DashboardHeader";

export default function ScholarDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [scholarData, setScholarData] = useState({
    name: "Jane Doe",
    enrollmentId: "phd-XYZ",
    notifications: [
      {
        id: 1,
        message: "Progress Report 3 requires your attention",
        date: "04/30/2025",
        read: false,
      },
      {
        id: 2,
        message: "Supervisor has commented on your latest submission",
        date: "04/28/2025",
        read: true,
      },
      {
        id: 3,
        message: "Semester fee payment reminder",
        date: "04/20/2025",
        read: true,
      },
    ],
  });

  useEffect(() => {
    const fetchProfile = async (profileId: number) => {
      try {
        const res = await fetch(`/api/phd-scholar/profile/?id=${profileId}`);
        const data = await res.json();

        setScholarData((prev) => ({
          ...prev,
          name: data.name,
          enrollmentId: data.enrollmentId,
        }));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile(1);
    setMounted(true);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header - This would be your common header */}
      <header className="bg-blue-600 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold white">Ph.D. Scholar Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="text-white hover:text-gray-700">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {scholarData.notifications.filter((n) => !n.read).length >
                  0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
            </div>
            <div className="h-8 w-8 rounded-full bg-white text-blue-600 flex items-center justify-center">
              {scholarData.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Scholar Dashboard Header */}
        <DashboardHeader
          name={scholarData.name}
          enrollmentId={scholarData.enrollmentId}
        />

        {/* Tab Navigation */}
        <div className="mb-6 bg-white rounded-lg shadow-sm overflow-x-auto">
          <div className="border-b border-gray-200 min-w-max">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("submissions")}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === "submissions"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Submissions
              </button>
              <button
                onClick={() => setActiveTab("forms")}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === "forms"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Forms
              </button>
              <button
                onClick={() => setActiveTab("fees")}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === "fees"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Fees & Accounts
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="show"
          variants={fadeIn}
        >
          {/* Overview Tab */}

          {activeTab === "overview" && <OverviewTab profileId={1} />}

          {/* Submissions Tab */}
          {activeTab === "submissions" && (
            <div className="space-y-6">
              {/* Research Proposal */}
              <Card title="Research Proposal" className="">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-black">
                      Research Proposal Document
                    </h4>
                    <p className="text-xs text-black mt-1">
                      Uploaded on January 15, 2024
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                    <StatusBadge status="Approved" />
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      View
                    </button>
                  </div>
                </div>
              </Card>

              {/* Progress Reports */}
              <ProgressReports />
              {/* Pre-Submission */}
              <PreThesisCard />
              {/* Final Thesis */}
              <FinalThesisCard />
            </div>
          )}

          {/* Forms Tab */}
          {activeTab === "forms" && <FormsTab />}

          {/* Fees Tab */}
          {activeTab === "fees" && <FeeTab />}
        </motion.div>
      </main>
    </div>
  );
}
