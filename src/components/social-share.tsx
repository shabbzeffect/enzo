"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { parseKenyanPhone, whatsappLink } from "@/lib/data/demo";

export type ShareProps = {
  url: string;
  title: string;
  message?: string;
};

export function SocialShare({ url, title, message }: ShareProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const defaultMessage = message || `Check out "${title}" on Nyumba Edit: ${url}`;

  const whatsappUrl = whatsappLink("+254700000000", defaultMessage);
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

  const shareOptions = [
    {
      label: "WhatsApp",
      href: whatsappUrl,
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.7 12.9c-1.8 0-3.6-.6-4.9-1.8-2.6-2.6-2.6-6.8 0-9.4 1.3-1.3 3-2 4.9-2 3.6 0 5.1 1.5 5.1 4.3 0 1.8-.7 3.5-2 4.9-1.3 1.2-3.1 1.8-4.9 1.8zM17 12c0-3.9-3.2-7-7-7-1.9 0-3.7.5-5.2 1.4-1.1.7-1.7 1.8-1.7 2.9 0 .6.2 1.2.6 1.7l.8 1c.3.4.5.8.6 1.2.1.3.2.7.2 1 0 .3 0 .7-.1 1-.1.4-.2.8-.5 1.1-.3.4-.6.7-1 1-.4.4-.7.8-1 1.2-.2.3-.4.7-.6 1-.1.2-.2.4-.2.7v.1c0 .1 0 .3.1.4.1.3.2.6.4.9.1.2.3.4.4.6l.1.1c.2.2.4.4.7.6.2.1.4.3.6.4.3.2.6.3.9.4.2.1.5.2.8.2.3 0 .6.1.9.1.2 0 .4 0 .6-.1s.3-.1.4-.2c.2-.1.3-.3.5-.5.1-.1.2-.3.3-.4.2-.2.3-.4.5-.6.1-.2.2-.4.2-.7s0-.5-.1-.7c-.1-.2-.2-.4-.4-.6-.2-.2-.4-.4-.6-.7-.1-.1-.2-.3-.2-.5v-.1c0-.1 0-.3-.1-.4-.1-.3-.2-.6-.4-.9s-.3-.3-.5-.4c-.1-.1-.2-.3-.3-.4-.2-.2-.3-.4-.5-.6-.1-.1-.2-.3-.3-.5-.1-.2-.2-.3-.3-.5s-.1-.3-.2-.5c-.1-.2-.1-.4-.2-.6 0-.1-.1-.2-.1-.3v-.1c0-.2 0-.3-.1-.5 0-.1 0-.2-.1-.3l-.1-.2c-.1-.1-.2-.3-.2-.4s-.1-.2-.1-.3c0-.1 0-.2-.1-.3l-.1-.1c0-.1 0-.2-.1-.3 0-.1-.1-.1-.1-.2l-.1-.1c0-.1 0-.1-.1-.2 0 0 0-.1 0-.1zm-1.4 6.8c-.1.1-.2.2-.4.3-.2.1-.4.1-.6.2-.2 0-.4 0-.6-.1-.2-.1-.4-.1-.6-.2s-.2-.1-.3-.2c-.1-.1-.2-.3-.3-.4-.1-.1-.2-.3-.3-.5-.1-.1-.1-.3-.2-.4-.1-.2-.2-.3-.2-.5 0-.1-.1-.2-.1-.3 0-.1 0-.2-.1-.3l-.1-.1c0-.1 0-.1-.1-.2 0-.1 0-.1-.1-.1v-.1c0-.1 0-.1 0-.1 0-.1 0-.1-.1-.2 0 0 0 0 0 0z" />
        </svg>
      ),
      color: "bg-green-600",
    },
    {
      label: "Facebook",
      href: facebookUrl,
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.039 3.228 9.433 7.795 11.136v-8.083H4.718V12.073h2.866V9.271c0-2.429 1.419-3.939 3.8-3.939 1.052 0 2.186.173 2.579.27v2.373h5.423l-1.558 3.86H8.955v8.083h4.279v-6.78c0-2.254 1.274-3.51 2.904-3.51 1.439 0 2.328.642 2.328 1.477v1.785h3.145l-1.738-4.316H14.38c-.027-.116-.047-.214-.047-.376 0-.773.41-1.276 1.122-1.276.486 0 .725.195.799.297l2.452.818c.451.069.687-.377.687-.777 0-1.228-.637-1.92-1.496-1.92-.415 0-.694.211-.931.454-.307.314-.43.683-.43 1.096v2.447h-3.159c0 2.146 1.494 2.893 1.939 3.583v4.918H9.593V12.073z" />
        </svg>
      ),
      color: "bg-tertiary",
    },
    {
      label: "X",
      href: xUrl,
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "bg-tertiary",
    },
    {
      label: "Copy link",
      href: url,
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      ),
      color: "bg-muted",
    },
  ];

  return (
    <div className="flex gap-2">
      {shareOptions.map((option) => (
        <Button
          key={option.label}
          variant={option.label === "Copy link" ? "outline" : "ghost"}
          size="sm"
          className="w-auto px-3"
          asChild
        >
          <a href={option.href} target="_blank" rel="noopener noreferrer">
            {option.icon}
            <span className="hidden sm:inline">{option.label}</span>
          </a>
        </Button>
      ))}
    </div>
  );
}
