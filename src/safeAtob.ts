const nativeAtob = window.atob.bind(window);

function normalizeBase64(value: string) {
  const cleaned = value
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .replace(/[^A-Za-z0-9+/=]/g, '')
    .replace(/=+$/g, '');

  return cleaned.padEnd(Math.ceil(cleaned.length / 4) * 4, '=');
}

window.atob = (value: string) => nativeAtob(normalizeBase64(value));

export {};
