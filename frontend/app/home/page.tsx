"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const roleData = [
  {
    name: "Ph.D. Scholar",
    description: "Apply, submit documents, track progress, upload thesis",
    icon: "/icons/student.svg",
    route: "/scholar-login",
    color: "bg-blue-600 hover:bg-blue-700"
  },
  {
    name: "Supervisor",
    description: "Review proposals, monitor progress, suggest evaluators",
    icon: "/icons/supervisor.svg",
    route: "/supervisor-login",
    color: "bg-emerald-600 hover:bg-emerald-700"
  },
  {
    name: "Co-Supervisor",
    description: "Support primary supervisor, co-sign research documents",
    icon: "/icons/co-supervisor.svg",
    route: "/co-supervisor-login",
    color: "bg-indigo-600 hover:bg-indigo-700"
  },
  {
    name: "Doctoral Research Committee",
    description: "Verify eligibility, allocate supervisors, form DSC",
    icon: "/icons/drc.svg",
    route: "/drc-login",
    color: "bg-amber-600 hover:bg-amber-700"
  },
  {
    name: "Doctoral Scrutiny Committee",
    description: "Evaluate progress reports, review thesis submissions",
    icon: "/icons/dsc.svg",
    route: "/dsc-login",
    color: "bg-purple-600 hover:bg-purple-700"
  },
  {
    name: "University Admin",
    description: "Manage entire process, approvals, and compliance",
    icon: "/icons/admin.svg",
    route: "/admin-login",
    color: "bg-red-600 hover:bg-red-700"
  },
  {
    name: "Accounts Officer",
    description: "Verify fees, issue clearance certificates",
    icon: "/icons/accounts.svg",
    route: "/accounts-login",
    color: "bg-teal-600 hover:bg-teal-700"
  },
  {
    name: "Viva Voce Board",
    description: "Conduct oral defense, provide final evaluation",
    icon: "/icons/viva.svg",
    route: "/viva-login",
    color: "bg-pink-600 hover:bg-pink-700"
  }
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ph.D. Approval Based Management System
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              A comprehensive platform for streamlined management of doctoral research journeys
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Learn More
              </button>
              <button className="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Role Selection */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Select Your Role</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access your personalized dashboard based on your role in the Ph.D. approval process
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {roleData.map((role, index) => (
              <motion.div 
                key={index} 
                variants={item}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <div className={`h-2 ${role.color.split(' ')[0]}`}></div>
                <div className="p-6">
                  <div className="mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {/* Replace with your actual icons */}
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{role.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm h-12">
                    {role.description}
                  </p>
                  <Link href={role.route}>
                    <div className={`w-full text-center py-2 rounded-lg text-white font-medium ${role.color} transition-colors cursor-pointer`}>
                      Log In
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Key Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform streamlines the entire Ph.D. journey from application to degree award
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Streamlined Approvals</h3>
              <p className="text-gray-600 text-sm">
                Sequential approval workflow ensures proper validation at every stage of research
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Document Management</h3>
              <p className="text-gray-600 text-sm">
                Centralized repository for all research documents, proposals, and thesis materials
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Progress Tracking</h3>
              <p className="text-gray-600 text-sm">
                Real-time monitoring of research progress with analytics and status updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}