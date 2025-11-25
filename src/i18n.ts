import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import ko from "./locales/ko/translation.json";

const resources = {
  en: { translation: { ...en } },
  ko: { translation: { ...ko } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  // 지원되지 않는 언어 설정일 때 사용할 기본 언어 설정
  fallbackLng: "ko",
  // 디버그 모드
  debug: true,
  interpolation: {
    // React는 기본적으로 XSS를 방어하므로 false로 설정
    escapeValue: false,
  },
});

export default i18n;