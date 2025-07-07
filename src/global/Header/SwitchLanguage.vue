<template>
  <v-menu update:modelValue>
    <template v-slot:activator="{ props }">
      <div
        v-bind="props"
        class="flex text-sm gap-2 items-center hover:bg-[#84a3f624] p-2 justify-center rounded"
      >
        <v-icon class="text-blue-500">mdi-web</v-icon>
        <span>{{ langs.find((i: any) => i.value == locale).title }}</span>
        <v-icon>mdi-chevron-down</v-icon>
      </div>
    </template>
    <v-list>
      <v-list-item
        class="py-0 min-h-0"
        v-for="(item, index) in langs"
        :key="index"
        @click="changeLang(item.value)"
      >
        <span>
          {{ item.title }}
        </span>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
// @ts-ignore
const { locale, setLocale } = useI18n();

const langs: any = [
  { title: "عربي", value: "ar" },
  { title: "English", value: "en" },
  { title: "Melayu", value: "ms" },
];

// Set initial locale from cookie or default to Arabic
onMounted(() => {
  useHead({
    htmlAttrs: {
      dir: locale.value == "ar" ? "rtl" : "ltr",
    },
  });
});

const changeLang = (l: "ar" | "en" | "ms") => {
  setLocale(l);
};

const langCookie = useCookie("lang");
const arabCountries = [
  "DZ", // Algeria
  "BH", // Bahrain
  "EG", // Egypt
  "IQ", // Iraq
  "JO", // Jordan
  "KW", // Kuwait
  "LB", // Lebanon
  "LY", // Libya
  "MR", // Mauritania
  "MA", // Morocco
  "OM", // Oman
  "PS", // Palestine 🤍
  "QA", // Qatar
  "SA", // Saudi Arabia
  "SO", // Somalia
  "SD", // Sudan
  "SY", // Syria
  "TN", // Tunisia
  "AE", // United Arab Emirates
  "YE", // Yemen
];

const malayCountries = [
  "MY", // Malaysia
  "BN", // Brunei
  "SG", // Singapore
  "ID", // Indonesia
];

const getGeoLocation = async () => {
  try {
    if (langCookie.value) return;

    const res: any = await $fetch("https://ipwho.is/");
    const countryCode = res.country_code;

    let lang: "ar" | "en" | "ms" = "en";

    if (arabCountries.includes(countryCode)) lang = "ar";
    else if (arabCountries.includes(countryCode)) lang = "ms";

    langCookie.value = lang;
    changeLang(lang);
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  getGeoLocation();
});

watch(locale, async (newLocale: string) => {
  const isArabic = newLocale === "ar";

  useHead({
    htmlAttrs: {
      dir: isArabic ? "rtl" : "ltr",
    },
  });
});
</script>
