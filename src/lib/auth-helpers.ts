export const validateName = (v: string) => (v.trim().length < 2 ? "নাম কমপক্ষে ২ অক্ষরের হতে হবে" : null);

export const validateEmail = (v: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? null : "সঠিক ইমেইল ঠিকানা দিন");

export const validatePassword = (v: string) => (v.length < 8 ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" : null);

// only allow in-site paths, so ?redirect=https://evil.com can't be used
export const safeRedirect = (v: string | null) => (v && v.startsWith("/") && !v.startsWith("//") ? v : "/");
