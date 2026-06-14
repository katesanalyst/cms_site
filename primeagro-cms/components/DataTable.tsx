"use client";

import Link from "next/link";

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  basePath: string;
}

export default function DataTable({ columns, data, basePath }: DataTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-3 font-medium text-gray-600">
                {col.label}
              </th>
            ))}
            <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3">
                  {col.render ? col.render(item[col.key], item) : item[col.key] ?? "-"}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <Link
                  href={`${basePath}/${item.id}`}
                  className="text-blue-600 hover:text-blue-800 mr-3"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-400">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
