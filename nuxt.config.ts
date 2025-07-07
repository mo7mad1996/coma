// @ts-ignore
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  ssr: true,
  srcDir: "src/",

  css: ["~/assets/css/main.scss", "~/assets/css/sass-setup.scss"],

  modules: [
    "~/router/index",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "nuxt-lazytube",
    "nuxt-tiptap-editor",
  ],

  components: [
    "~/components",
    { path: "~/modules/home/components", prefix: "Home" },
    { path: "~/modules/about/components", prefix: "About" },
    { path: "~/modules/contact/components", prefix: "Contact" },
    { path: "~/modules/campaigns/components", prefix: "Campaigns" },
    { path: "~/modules/auth/components", prefix: "Auth" },
    { path: "~/modules/blogs/components", prefix: "Blog" },
    { path: "~/modules/stories/components", prefix: "story" },
    { path: "~/modules/charity/components", prefix: "Charity" },
    { path: "~/modules/donor/components", prefix: "Donor" },
    { path: "~/modules/videos/components", prefix: "Video" },
    { path: "~/modules/dashboard/components", prefix: "Dashboard" },
    { path: "~/global", prefix: "Global" },
    { path: "~/components/Layout", prefix: "Layout" },
  ],

  i18n: {
    strategy: "no_prefix",
    locales: [
      { code: "ar", language: "ar" },
      { code: "en", language: "en-US" },
      { code: "ms", language: "ms" },
    ],
    defaultLocale: "ar",
    vueI18n: "~/helpers/i18n.config.ts",
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: false,
      fallbackLocale: "ar",
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  app: {
    baseURL: "/",
    pageTransition: false,
    layoutTransition: false,
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "description",
          content:
            "مجتمع الأيتام هو منصة تهدف لدعم الأيتام من خلال حملات إنسانية ومبادرات مجتمعية. ساهم الآن في رعاية الأيتام.",
        },
        {
          name: "keywords",
          content:
            "مجتمع الأيتام, كفالة أيتام, دعم الأيتام, تبرعات, حملات إنسانية",
        },
        { name: "author", content: "Orphans Society" },
        { property: "og:title", content: "مجتمع الأيتام - قدم دعمك الآن" },
        {
          property: "og:description",
          content:
            "انضم إلى مجتمع الأيتام وكن جزءاً من التغيير. ساهم الآن في دعم الأيتام.",
        },
        {
          property: "og:image",
          content: "https://orphanssociety.com/og-image.jpg",
        },
        { property: "og:url", content: "https://orphanssociety.com/" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      script: [
        {
          type: "text/javascript",
          innerHTML: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WBQBJJ49');
          `,
          defer: true,
        },
      ],
      link: [
        { rel: "canonical", href: "https://orphanssociety.com/" },
        { rel: "icon", type: "image/ico", href: "/favicon.ico" },
      ],
    },
  },

  build: {
    transpile: ["form-data"],
  },

  vite: {
    optimizeDeps: {
      include: ["vue-tel-input"],
    },

    build: {
      chunkSizeWarningLimit: 1000,
      sourcemap: false,
      rollupOptions: {
        output: {},
      },

      commonjsOptions: {
        include: [/vue-tel-input/, /node_modules/],
      },
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  },

  robots: {
    disallow: "/dashboard/",
    sitemap: "/sitemap.xml",
  },

  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },

  vuetify: {
    vuetifyOptions: {
      date: {
        adapter: "vuetify",
      },
    },
  },
});
