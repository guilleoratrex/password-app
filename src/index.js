import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import common_es from './translations/es/common.json';
import common_en from './translations/en/common.json';
import common_ca from './translations/ca/common.json';

export const getNavigatorLanguage = () => {
  const navLang = window.navigator.language;
  localStorage.setItem('lang', navLang.split('-')[0]);
  return navLang.split('-')[0];
};

i18next.init({
  interpolation: { escapeValue: false },
  lng: getNavigatorLanguage(),
  resources: {
    es: {
      common: common_es,
    },
    en: {
      common: common_en,
    },
    ca: {
      common: common_ca,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Router>
        <App />
      </Router>
    </I18nextProvider>
  </React.StrictMode>
);

