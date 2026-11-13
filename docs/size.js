export const QUALITIES = [
  { q: 1080, label: "1080p Full HD", res: "1920 x 1080", low: 15, high: 30 },
  { q: 720, label: "720p HD", res: "1280 x 720", low: 8, high: 13 },
  { q: 480, label: "480p", res: "854 x 480", low: 4, high: 6 },
  { q: 360, label: "360p", res: "640 x 360", low: 2, high: 3 },
];

export function parseDuration(input) {
  const s = String(input == null ? "" : input).trim().toLowerCase();
  if (!s) return null;
  if (/^\d+(\.\d+)?$/.test(s)) return Math.round(Number(s) * 60);
  if (/^\d{1,2}(:\d{1,2}){1,2}$/.test(s)) {
    const parts = s.split(":").map(Number);
    if (parts.slice(1).some((n) => n > 59)) return null;
    return parts.reduce((t, n) => t * 60 + n, 0);
  }
  const m = s.match(/^(?:(\d+)\s*h(?:ours?|rs?)?)?\s*(?:(\d+)\s*m(?:in(?:utes?)?)?)?\s*(?:(\d+)\s*s(?:ec(?:onds?)?)?)?$/);
  if (m && (m[1] || m[2] || m[3])) return Number(m[1] || 0) * 3600 + Number(m[2] || 0) * 60 + Number(m[3] || 0);
  return null;
}

export function estimate(seconds, motion = 0.5) {
  if (!(seconds > 0)) return [];
  const t = Math.min(1, Math.max(0, motion));
  const min = seconds / 60;
  return QUALITIES.map((x) => {
    const low = x.low * min, high = x.high * min;
    return { ...x, lowMB: low, highMB: high, mb: low + (high - low) * t };
  });
}

export function formatMB(mb) {
  if (mb >= 1000) return (mb / 1000).toFixed(mb >= 10000 ? 0 : 1) + " GB";
  if (mb >= 10) return Math.round(mb) + " MB";
  return mb.toFixed(1) + " MB";
}

export function fits(storageGB, mbPerVideo) {
  if (!(storageGB > 0) || !(mbPerVideo > 0)) return 0;
  return Math.floor((storageGB * 1000) / mbPerVideo);
}
