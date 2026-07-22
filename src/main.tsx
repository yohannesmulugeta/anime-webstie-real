import './safeAtob';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './fixes.css';

const nativeFetch = window.fetch.bind(window);

window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const response = await nativeFetch(input, init);
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;

  if (!url.includes('.b64')) return response;

  const normalized = (await response.text()).replace(/[^A-Za-z0-9+/=_-]/g, '');
  return new Response(normalized, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
};

const updateDepth = (event: PointerEvent) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 28;
  const y = (event.clientY / window.innerHeight - 0.5) * 20;
  document.documentElement.style.setProperty('--depth-x', `${x.toFixed(2)}px`);
  document.documentElement.style.setProperty('--depth-y', `${y.toFixed(2)}px`);
};

window.addEventListener('pointermove', updateDepth, { passive: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
