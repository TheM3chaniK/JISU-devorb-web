import React from "react";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import PaymentHistory from "./PaymentHistory";

// Example static mock — replace with real data or props
const scholarData = {
  fees: [
    {
      id: 1,
      name: "Registration Fee",
      amount: 5000,
      date: "May 5, 2025",
      status: "Paid",
      receipt: true,
    },
    {
      id: 2,
      name: "Semester Fee",
      amount: 10000,
      date: "June 30, 2025",
      status: "Due",
      receipt: false,
    },
  ],
};

const FeeTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Fee Overview */}
      <Card title="Fee Overview">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-black">Total Fees Due</h4>
            <p className="text-2xl font-bold text-black mt-2">₹10,000</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-black">Total Paid</h4>
            <p className="text-2xl font-bold text-black mt-2">₹15,000</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-black">Next Payment Due</h4>
            <p className="text-2xl font-bold text-black mt-2">
              June 30, 2025
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Fee Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scholarData.fees.map((fee) => (
                <tr key={fee.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-black">
                      {fee.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-black">₹{fee.amount}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-black">
                      {fee.date || "June 30, 2025"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={fee.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {fee.receipt ? (
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </button>
                    ) : (
                      <button className="bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded hover:bg-blue-700 transition">
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment History */}
      <PaymentHistory />
    </div>
  );
};

export default FeeTab;

