export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  // returns e.g. "Apr 2, 2024 15:00"
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}
