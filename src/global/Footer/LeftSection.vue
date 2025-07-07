<template>
  <div>
    <img
      :src="localState.icon || settings.icon"
      :alt="localState[`${locale}.site_name`] || settings.site_name"
      class="h-16 mx-2"
    />
    <p class="text-lg font-semibold mt-4">
      {{ localState[`${locale}.site_name`] || settings.site_name }}
    </p>
    <p
      class="opacity-60 mt-2"
      v-html="
        (localState[`${locale}.description`] || settings.description)?.replace(
          /\n/g, // \n => <br />
          '<br />'
        )
      "
    />
    <!-- <div
      class="flex w-full gap-12 items-center justify-around md:justify-start mt-4"
    >
      <img  loading="lazy" src="~/assets/images/visa.png" alt="Visa" />
      <img  loading="lazy" src="~/assets/images/master.png" alt="MasterCard" />
      <img  loading="lazy" src="~/assets/images/apple.png" alt="Apple Pay" />
      <img  loading="lazy" src="~/assets/images/paypal.png" alt="PayPal" />
    </div> -->
  </div>
</template>
<script setup lang="ts">
const localState: any = useState("settings", () => ({}));
const { locale } = useI18n();

const props = defineProps(["settings"]);
</script>
