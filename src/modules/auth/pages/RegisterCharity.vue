<template>
  <section aria-label="login page">
    <GlobalContainer>
      <div
        class="flex lg:flex-row xl:flex-row md:flex-col-reverse flex-col-reverse justify-between items-center lg:gap-md xl:gap-md md:gap-md gap-sm"
      >
        <AuthCharityForm />

        <div class="image">
          <img
            loading="lazy"
            src="~/assets/images/auth/login-img.svg"
            class="lg:h-[702px] xl:h-[702px] md:h-full h-full"
            alt="orphanssociety image"
          />
        </div>
      </div>
    </GlobalContainer>
  </section>
</template>

<script setup>
import { useGlobalVar } from "~/helpers/global-var";

definePageMeta({
  middleware: "guest",
});

const { siteName } = useGlobalVar();
siteName("auth.page_title_register_charity");
</script>
