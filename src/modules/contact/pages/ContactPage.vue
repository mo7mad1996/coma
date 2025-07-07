<template>
  <section aria-label="contact us page" class="pt-sm pb-sm">
    <GlobalContainer>
      <div
        :class="{
          'flex-row-reverse': locale.value === 'ar',
          'flex-row': locale.value === 'en',
          'lg:flex-row xl:flex-row md:flex-col-reverse flex-col-reverse': true,
        }"
        class="flex justify-between items-center lg:gap-xl xl:gap-xl md:gap-md gap-sm"
      >
        <ContactForm />
        <ContactVideo />
      </div>
    </GlobalContainer>
  </section>
</template>

<script setup>
import { useGlobalVar } from "~/helpers/global-var";

const { locale } = useI18n();
const { siteName } = useGlobalVar();
siteName("contact.page_title_contact_page");
</script>
