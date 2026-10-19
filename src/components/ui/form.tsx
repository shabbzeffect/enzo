"use client";

import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  required?: boolean;
};

export function Input({ className, label, error, required, id, ...props }: InputProps) {
  const fieldId = id || props.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={fieldId}
          className="text-sm font-semibold text-foreground block"
        >
          {label}{required && <span className="text-tertiary ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={fieldId}
        className={[
          "w-full rounded-xl border border-border bg-white px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible-ring transition-colors",
          error ? "border-tertiary focus:border-tertiary" : "",
          className,
        ].filter(Boolean).join(" ")}
        {...props}
      />
      {error && (
        <p className="text-xs text-tertiary">{error}</p>
      )}
    </div>
  );
}

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  required?: boolean;
};

export function Textarea({ className, label, error, required, id, ...props }: TextareaProps) {
  const fieldId = id || props.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={fieldId}
          className="text-sm font-semibold text-foreground block"
        >
          {label}{required && <span className="text-tertiary ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <textarea
        id={fieldId}
        className={[
          "w-full rounded-xl border border-border bg-white px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible-ring transition-colors",
          error ? "border-tertiary focus:border-tertiary" : "",
          className,
        ].filter(Boolean).join(" ")}
        {...props}
      />
      {error && (
        <p className="text-xs text-tertiary">{error}</p>
      )}
    </div>
  );
}

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  required?: boolean;
};

export function Select({ className, label, error, required, id, children, ...props }: SelectProps) {
  const fieldId = id || props.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={fieldId}
          className="text-sm font-semibold text-foreground block"
        >
          {label}{required && <span className="text-tertiary ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <select
        id={fieldId}
        className={[
          "w-full rounded-xl border border-border bg-white px-3 py-2 text-foreground focus-visible-ring transition-colors",
          error ? "border-tertiary focus:border-tertiary" : "",
          className,
        ].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-xs text-tertiary">{error}</p>
      )}
    </div>
  );
}

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string | React.ReactNode;
  error?: string;
  required?: boolean;
};

export function Checkbox({ className, label, error, required, id, ...props }: CheckboxProps) {
  const fieldId = id || props.name;
  return (
    <div className="flex items-start gap-3">
      <input
        id={fieldId}
        className={[
          "mt-0.5 rounded border-tertiary text-tertiary focus:ring-tertiary transition-colors",
          error ? "border-tertiary focus:border-tertiary" : "",
          className,
        ].filter(Boolean).join(" ")}
        {...props}
      />
      <div>
        {label && (
          <label htmlFor={fieldId} className="text-sm font-semibold text-foreground">
            {label}{required && <span className="text-tertiary ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        {error && <p className="text-xs text-tertiary">{error}</p>}
      </div>
    </div>
  );
}
