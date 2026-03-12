"use client";

import { useEffect, useMemo, useState } from "react";

type EmailLinkProps = {
  className?: string;
  children: React.ReactNode;
  revealAddress?: boolean;
  onClick?: () => void;
  subject?: string;
  body?: string;
};

function decodeB64(value: string): string {
  if (!value) return "";
  try {
    if (typeof window !== "undefined" && typeof window.atob === "function") {
      return window.atob(value);
    }
    return Buffer.from(value, "base64").toString("utf8");
  } catch {
    return "";
  }
}

export default function EmailLink({
  className,
  children,
  revealAddress = false,
  onClick,
  subject,
  body,
}: EmailLinkProps) {
  const [email, setEmail] = useState("");
  const encoded = process.env.NEXT_PUBLIC_CONTACT_EMAIL_B64 ?? "";

  useEffect(() => {
    setEmail(decodeB64(encoded));
  }, [encoded]);

  const fallbackText = useMemo(() => "contact [at] dropsort [dot] io", []);

  const mailtoHref = useMemo(() => {
    if (!email) return "#";
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (body) params.set("body", body);
    const query = params.toString();
    return `mailto:${email}${query ? `?${query}` : ""}`;
  }, [email, subject, body]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!email) e.preventDefault();
    onClick?.();
    if (!email) return;
    window.location.href = mailtoHref;
  };

  return (
    <a href={mailtoHref} onClick={handleClick} className={className}>
      {revealAddress ? (email || fallbackText) : children}
    </a>
  );
}
