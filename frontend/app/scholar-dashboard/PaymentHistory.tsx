import React from "react";
import Card from "../components/Card";

const PaymentHistory: React.FC = () => {
  return (
    <Card title="Payment History">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              >
                Transaction ID
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              >
                Receipt
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-black">TXN-001</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-black">05/01/2024</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-black">Registration Fee</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-black">₹5,000</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Download
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-black">TXN-002</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-black">10/01/2024</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-black">Semester Fee (1st)</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-black">₹10,000</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Download
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default PaymentHistory;

