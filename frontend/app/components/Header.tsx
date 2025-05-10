"use client";
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">JU</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">JIS University</h1>
            <p className="text-xs text-gray-500">Ph.D. Management System</p>
          </div>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/about" className="px-4 py-1 text-sm border border-black text-black rounded-full hover:bg-gray-50 transition cursor-pointer">
            About
          </Link>
          <Link href="/help" className="px-4 py-1 text-sm border border-black text-black rounded-full hover:bg-gray-50 transition cursor-pointer">
            Help
          </Link>
          <Link href="/contact" className="px-4 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition cursor-pointer">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}