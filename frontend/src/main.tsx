import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import {INDORE_INSTITUTES} from './data/indoreData';
import './index.css';

// Proxy API requests through the site origin so session cookies remain first-party.
const originalFetch = window.fetch;
const customFetch = function (input: RequestInfo | URL, init?: RequestInit) {
  let isApiRequest = false;

  const proxyApiUrl = (url: URL) => {
    if (url.origin !== window.location.origin || !url.pathname.startsWith('/api/')) {
      return url;
    }

    isApiRequest = true;
    if (import.meta.env.PROD && !url.pathname.startsWith('/api/proxy/')) {
      url.pathname = `/api/proxy/${url.pathname.slice('/api/'.length)}`;
    }
    return url;
  };

  if (typeof input === 'string') {
    const url = new URL(input, window.location.origin);
    if (url.pathname.startsWith('/api/')) {
      const rewritten = proxyApiUrl(url);
      input = input.startsWith('/') ? `${rewritten.pathname}${rewritten.search}` : rewritten.href;
    }
  } else if (input instanceof URL) {
    input = proxyApiUrl(new URL(input.href));
  } else if (input instanceof Request) {
    const rewritten = proxyApiUrl(new URL(input.url));
    if (rewritten.href !== input.url) input = new Request(rewritten.href, input);
  }

  return originalFetch(input, isApiRequest ? { ...init, credentials: 'include' } : init);
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

const rootElement = document.getElementById('root')!;
const initialInstitutes = (window as Window & { __INITIAL_INSTITUTES__?: typeof INDORE_INSTITUTES }).__INITIAL_INSTITUTES__ || INDORE_INSTITUTES;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App initialInstitutes={initialInstitutes} />
    </BrowserRouter>
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
