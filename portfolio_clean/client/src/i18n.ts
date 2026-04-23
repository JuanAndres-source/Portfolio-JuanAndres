import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { withTolgee, Tolgee, devTools } from '@tolgee/i18next';

// Importamos los diccionarios locales que creamos antes
import esTranslation from './locales/es.json';
import enTranslation from './locales/en.json';

// Inicializamos el puente de Tolgee usando las variables secretas de tu .env
const tolgee = Tolgee()
  .use(devTools())
  .init({
    apiUrl: import.meta.env.VITE_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_TOLGEE_API_KEY,
  });

// Conectamos i18next con Tolgee y React
i18n
  .use(withTolgee(tolgee))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: esTranslation,
      en: enTranslation,
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;