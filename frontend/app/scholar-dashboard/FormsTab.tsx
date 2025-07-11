import React, { useEffect, useState } from "react";
import Card from "../components/Card";

interface FormDocument {
  id: string;
  name: string;
  type: string;   // e.g., "Admission and Enrollment Documents"
  filename: string;
}

interface GroupedForms {
  [type: string]: FormDocument[];
}

const FormsTab: React.FC = () => {
  const [forms, setForms] = useState<FormDocument[]>([]);

  useEffect(() => {
    fetch("/api/docs/forms/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched forms:", data);
        setForms(data.forms || []);
      })
      .catch((err) => console.error("Error fetching forms:", err));
  }, []);

  // Group forms by `type`
  const grouped: GroupedForms = forms.reduce((acc, form) => {
    if (!acc[form.type]) acc[form.type] = [];
    acc[form.type].push(form);
    return acc;
  }, {} as GroupedForms);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([type, group]) => (
        <Card key={type} title={type}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.map((form) => (
              <div
                key={form.id}
                className="border rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer"
                onClick={() =>
                  window.open(`/api/docs/forms/${form.id}/download`, "_blank")
                }
              >
                <h4 className="text-sm font-medium text-black">{form.name}</h4>
                <p className="text-xs text-black mt-1">
                  {/* Placeholder until you add real description */}
                  Click to download
                </p>
                <div className="flex justify-end mt-2">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {forms.length === 0 && (
        <div className="text-sm text-gray-500">No forms available.</div>
      )}
    </div>
  );
};

export default FormsTab;

