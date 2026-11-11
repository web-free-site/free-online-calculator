import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

type FieldProps = {
  id: string;
  label: string;
  children: React.ReactNode;
};

export function Field({ id, label, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

export function TextInput({
  id,
  label,
  ...rest
}: { id: string; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Field id={id} label={label}>
      <input id={id} name={id} className="input-field" {...rest} />
    </Field>
  );
}

export function SelectInput({
  id,
  label,
  children,
  ...rest
}: { id: string; label: string; children: React.ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Field id={id} label={label}>
      <select id={id} name={id} className="input-field" {...rest}>
        {children}
      </select>
    </Field>
  );
}
