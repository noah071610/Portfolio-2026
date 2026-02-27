import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

// 작성한 번역 파일 불러오기
import translationJA from "./locales/ja.json"
import translationKO from "./locales/ko.json"

const resources = {
  ja: { translation: translationJA },
  ko: { translation: translationKO },
}

export const i18nReady = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ["ja", "ko"],
    fallbackLng: "ko",
    load: "languageOnly", // 'ja-JP' → 'ja'로 매칭
    detection: {
      order: ["navigator", "htmlTag", "querystring", "cookie", "localStorage"],
      caches: ["localStorage", "cookie"],
      lookupLocalStorage: "i18nextLng",
      lookupCookie: "i18next",
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
