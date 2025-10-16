export function formatMoney(n: number) {
  return new Intl.NumberFormat(undefined, { 
    style: "currency", 
    currency: "USD" 
  }).format(n);
}

export function formatLocalDateTime(iso?: string | null) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(d);
  } catch {
    return iso ?? "—";
  }
}

export function getLocalTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getRoleLabel(role: 0 | 1 | 2) {
  return role === 0 ? "Student" : role === 1 ? "Teacher" : "Admin";
}
