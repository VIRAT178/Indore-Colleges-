import React, {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App, {getCollegeJsonLd, getPageSeo, PageSeo} from './App';
import {INDORE_INSTITUTES} from './data/indoreData';
import {Institute} from './types';

export function getStaticCollegeRoutes(): string[] {
  return INDORE_INSTITUTES
    .filter(institute => institute.type === 'college')
    .map(institute => `/college/${institute.id}`);
}

export function renderPage(url: string, institutes: Institute[] = INDORE_INSTITUTES): {appHtml: string; seo: PageSeo | null; jsonLd: string | null} {
  const appHtml = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App initialInstitutes={institutes} />
      </StaticRouter>
    </StrictMode>,
  );
  const seo = getPageSeo(url, institutes);
  const collegeId = url.startsWith('/college/') ? url.slice('/college/'.length) : '';
  const college = collegeId ? institutes.find(institute => institute.id === collegeId) : undefined;

  return {
    appHtml,
    seo,
    jsonLd: college && seo
      ? JSON.stringify(getCollegeJsonLd(college, seo.canonical, seo.description, seo.image))
      : null,
  };
}
