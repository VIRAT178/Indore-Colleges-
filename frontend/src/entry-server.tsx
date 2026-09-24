import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App, {getPageSeo, PageSeo} from './App';
import {INDORE_INSTITUTES} from './data/indoreData';

export function renderPage(url: string): {appHtml: string; seo: PageSeo | null} {
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <App initialInstitutes={INDORE_INSTITUTES} />
    </StaticRouter>,
  );

  return {
    appHtml,
    seo: getPageSeo(url, INDORE_INSTITUTES),
  };
}
