"use strict";

import * as React from "react";
import { parseKenyanPhone, whatsappLink } from "@/lib/data/demo";

export type WhatsAppButtonProps = {
  phone: string;
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
};

export function WhatsAppButton({
  phone,
  message = "Hi, I found you on Nyumba Edit. I'm interested in learning more about your products. Could you share price and availability?",
  size = "md",
  className,
  label,
}: WhatsAppButtonProps) {
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <a
      href={whatsappLink(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center gap-2 rounded-xl bg-green-700 text-white font-semibold",
        "hover:bg-green-600 focus-visible-ring transition-colors",
        sizes[size],
        className,
      ].filter(Boolean).join(" ")}
    >
      <svg
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.7 12.9c-1.8 0-3.6-.6-4.9-1.8-2.6-2.6-2.6-6.8 0-9.4 1.3-1.3 3-2 4.9-2 3.6 0 5.1 1.5 5.1 4.3 0 1.8-.7 3.5-2 4.9-1.3 1.2-3.1 1.8-4.9 1.8zM17 12c0-3.9-3.2-7-7-7-1.9 0-3.7.5-5.2 1.4-1.1.7-1.7 1.8-1.7 2.9 0 .6.2 1.2.6 1.7l.8 1c.3.4.5.8.6 1.2.1.3.2.7.2 1 0 .3 0 .7-.1 1-.1.4-.2.8-.5 1.1-.3.4-.6.7-1 1-.4.4-.7.8-1 1.2-.2.3-.4.7-.6 1-.1.2-.2.4-.2.7v.1c0 .1 0 .3.1.4.1.3.2.6.4.9.1.2.3.4.4.6l.1.1c.2.2.4.4.7.6.2.1.4.3.6.4.3.2.6.3.9.4.2.1.5.2.8.2.3 0 .6.1.9.1.2 0 .4 0 .6-.1s.3-.1.4-.2c.2-.1.3-.3.5-.5.1-.1.2-.3.3-.4.2-.2.3-.4.5-.6.1-.2.2-.4.2-.7s0-.5-.1-.7c-.1-.2-.2-.4-.4-.6-.2-.2-.4-.4-.6-.7-.1-.1-.2-.3-.2-.5v-.1c0-.1 0-.3-.1-.4-.1-.3-.2-.6-.4-.9s-.3-.3-.5-.4c-.1-.1-.2-.3-.3-.4-.2-.2-.3-.4-.5-.6-.1-.1-.2-.3-.3-.5-.1-.2-.2-.3-.3-.5s-.1-.3-.2-.5c-.1-.2-.1-.4-.2-.6 0-.1-.1-.2-.1-.3v-.1c0-.2 0-.3-.1-.5 0-.1 0-.2-.1-.3l-.1-.2c-.1-.1-.2-.3-.2-.4s-.1-.2-.1-.3c0-.1 0-.2-.1-.3l-.1-.1c0-.1 0-.2-.1-.3 0-.1-.1-.1-.1-.2l-.1-.1c0-.1 0-.1-.1-.2 0 0 0-.1 0-.1v-.1c0-.1 0-.1 0-.1 0-.1 0-.1-.1-.2 0 0 0 0 0 0zm-1.4 6.8c-.1.1-.2.2-.4.3-.2.1-.4.1-.6.2-.2 0-.4 0-.6-.1-.2-.1-.4-.1-.6-.2s-.2-.1-.3-.2c-.1-.1-.2-.3-.3-.4-.1-.1-.2-.3-.3-.5-.1-.1-.1-.3-.2-.4-.1-.2-.2-.3-.2-.5 0-.1-.1-.2-.1-.3 0-.1 0-.2-.1-.3l-.1-.1c0-.1 0-.1-.1-.2 0-.1 0-.1-.1-.1v-.1c0-.1 0-.1 0-.1 0-.1 0-.1-.1-.2 0 0 0 0 0 0z" />
      </svg>
      {label ?? "WhatsApp"}
    </a>
  );
}

export type CallButtonProps = {
  phone: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
};

export function CallButton({
  phone,
  size = "md",
  className,
  label,
}: CallButtonProps) {
  const normalized = `tel:${parseKenyanPhone(phone)}`;
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <a
      href={normalized}
      className={[
        "inline-flex items-center gap-2 rounded-xl border border-border bg-white text-ink font-semibold",
        "hover:bg-cream-100 focus-visible-ring transition-colors",
        sizes[size],
        className,
      ].filter(Boolean).join(" ")}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 011 1.168l5.211 8.918a1 1 0 01-.073 1.32l-2.967 7.36a1 1 0 01-1.32.073l-7.36-2.967a1 1 0 01-.073-1.32l5.211-8.918a1 1 0 011.168-1H5a2 2 0 01-2-2z" />
      </svg>
      {label ?? "Call"}
    </a>
  );
}
