import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import es from './es';
import en from './en';

const resources = {
    en: {
        common: en
    },
    es: {
        common: es
    }
};

export const getLanguageDevice = () => {
    let locale = RNLocalize.getLocales();
    locale = Array.isArray(locale) ? locale[0] : locale;
    return locale.languageCode;
};

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: callback => {
        callback(getLanguageDevice());
    },
    init: () => { },
    cacheUserLanguage: () => { }
};

i18n
    .use(languageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        fallbackLng: 'es',
        resources,
        ns: ['common'],
        defaultNS: 'common',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;