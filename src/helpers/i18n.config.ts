import { ms } from "date-fns/locale";
//import { createI18n } from 'vue-i18n'
import arGlobal from "../locales/ar.json";
import enGlobal from "../locales/en.json";
import msGlobal from "../locales/ms.json";

import arHome from "../modules/home/locales/ar.json";
import enHome from "../modules/home/locales/en.json";
import msHome from "../modules/home/locales/ms.json";

import arAbout from "../modules/about/locales/ar.json";
import enAbout from "../modules/about/locales/en.json";
import msAbout from "../modules/about/locales/ms.json";

import arContact from "../modules/contact/locales/ar.json";
import enContact from "../modules/contact/locales/en.json";
import msContact from "../modules/contact/locales/ms.json";

import arCampaigns from "../modules/campaigns/locales/ar.json";
import enCampaigns from "../modules/campaigns/locales/en.json";
import msCampaigns from "../modules/campaigns/locales/ms.json";

import arAuth from "../modules/auth/locales/ar.json";
import enAuth from "../modules/auth/locales/en.json";
import msAuth from "../modules/auth/locales/ms.json";

import arBlogs from "../modules/blogs/locales/ar.json";
import enBlogs from "../modules/blogs/locales/en.json";
import msBlogs from "../modules/blogs/locales/ms.json";

import arStories from "../modules/stories/locales/ar.json";
import enStories from "../modules/stories/locales/en.json";
import msStories from "../modules/stories/locales/ms.json";

import arCharity from "../modules/charity/locales/ar.json";
import enCharity from "../modules/charity/locales/en.json";
import msCharity from "../modules/charity/locales/ms.json";

import arDonor from "../modules/donor/locales/ar.json";
import enDonor from "../modules/donor/locales/en.json";
import msDonor from "../modules/donor/locales/ms.json";

import arVideo from "../modules/videos/locales/ar.json";
import enVideo from "../modules/videos/locales/en.json";
import msVideo from "../modules/videos/locales/ms.json";

import arVuetify from "../locales/vuetify/ar.json";
import enVuetify from "../locales/vuetify/en.json";
import msVuetify from "../locales/vuetify/ms.json";

import arDashboard from "../modules/dashboard/locales/ar.json";
import enDashboard from "../modules/dashboard/locales/en.json";
import msDashboard from "../modules/dashboard/locales/ms.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ar",
  defaultLocale: "ar",
  fallbackLocale: "ar",

  messages: {
    en: {
      home: enHome,
      global: enGlobal,
      about: enAbout,
      contact: enContact,
      campaigns: enCampaigns,
      auth: enAuth,
      blogs: enBlogs,
      story: enStories,
      dashboard: enCharity,
      global_dashboard: enDashboard,
      donor: enDonor,
      videos: enVideo,
      $vuetify: enVuetify,
    },
    ar: {
      home: arHome,
      global: arGlobal,
      about: arAbout,
      contact: arContact,
      campaigns: arCampaigns,
      auth: arAuth,
      blogs: arBlogs,
      story: arStories,
      dashboard: arCharity,
      donor: arDonor,
      global_dashboard: arDashboard,
      videos: arVideo,
      $vuetify: arVuetify,
    },
    ms: {
      home: msHome,
      global: msGlobal,
      about: msAbout,
      contact: msContact,
      campaigns: msCampaigns,
      auth: msAuth,
      blogs: msBlogs,
      story: msStories,
      dashboard: msCharity,
      global_dashboard: msDashboard,
      donor: msDonor,
      videos: msVideo,
      $vuetify: msVuetify,
    },
  },
}));
