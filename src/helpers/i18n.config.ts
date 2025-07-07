import ar from "~/locales/vuetify/ar.json";
import en from "~/locales/vuetify/en.json";
import ms from "~/locales/vuetify/ms.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ar",
  messages: {
    ar: {
      $vuetify: ar,
    },
    en: {
      $vuetify: en,
    },
    ms: {
      $vuetify: ms,
    },
  },
}));