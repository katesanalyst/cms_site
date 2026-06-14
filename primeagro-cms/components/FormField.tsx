"use client";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "number" | "textarea" | "select" | "checkbox" | "url";
  value?: string | number | boolean;
  defaultValue?: string | number | boolean;
  options?: { label: string; value: string }[];
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export default function FormField({
  label, name, type = "text", value, defaultValue, options,
  required, placeholder, rows,
}: FormFieldProps) {
  const val = value ?? defaultValue ?? "";

  if (type === "textarea") {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">{label}</label>
        <textarea
          name={name}
          defaultValue={val as string}
          required={required}
          placeholder={placeholder}
          rows={rows ?? 4}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        />
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="mb-4 flex items-center gap-2">
        <input type="hidden" name={name} value="false" />
        <input
          type="checkbox"
          name={name}
          defaultChecked={val === true || val === "true"}
          className="w-4 h-4 accent-green-700"
        />
        <label className="text-sm font-medium">{label}</label>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">{label}</label>
        <select
          name={name}
          defaultValue={val as string}
          required={required}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={val as string}
        required={required}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
      />
    </div>
  );
}
