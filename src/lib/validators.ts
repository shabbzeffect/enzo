// src/lib/validators.ts
//
// Shared validation helpers for public forms (enquiries, listing requests).

export function isValidKenyanPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  // Accept +254XXXXXXXXX (9 digits after 254) or 07XX/01XX (9 digits after 0)
  if (digits.startsWith("254")) return digits.length === 12;
  if (digits.startsWith("0")) return digits.length === 10 && /^[071]/.test(digits);
  return false;
}

export function isValidEmail(raw: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);
}

export function normalizeKenyanPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  return `+254${digits}`;
}
