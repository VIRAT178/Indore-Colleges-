import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global fetch interceptor to support Vercel (frontend) + Render (backend) split deployment
const originalFetch = window.fetch;
const customFetch = function (input: any, init?: any) {
  const baseUrl = ((import.meta as any).env?.VITE_API_URL as string) || '';
  if (baseUrl) {
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    if (typeof input === 'string' && input.startsWith('/api/')) {
      input = `${cleanBaseUrl}${input}`;
    } else if (input instanceof URL && input.pathname.startsWith('/api/')) {
      input = new URL(`${cleanBaseUrl}${input.pathname}${input.search}`);
    } else if (input instanceof Request) {
      const urlStr = input.url;
      if (urlStr.startsWith('/api/')) {
        input = new Request(`${cleanBaseUrl}${urlStr}`, input);
      } else {
        try {
          const parsedUrl = new URL(urlStr);
          if (parsedUrl.pathname.startsWith('/api/') && parsedUrl.origin === window.location.origin) {
            input = new Request(`${cleanBaseUrl}${parsedUrl.pathname}${parsedUrl.search}`, input);
          }
        } catch (e) {
          // ignore parsing failures
        }
      }
    }
  }
  return originalFetch(input, init);
};

try {
  Object.defineProperty(window, 'fetch', {
    value: customFetch,
    configurable: true,
    writable: true,
  });
} catch (e) {
  try {
    (window as any).fetch = customFetch;
  } catch (err) {
    console.warn('Could not override window.fetch:', err);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
