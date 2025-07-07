<template>
  <section
    aria-label="login page"
    class="pt-sm pb-sm bg-neutral-100 min-h-[50dvh]"
  >
    <GlobalContainer>
      <div class="flex justify-center">
        <div class="bg-white p-8 rounded-xl">
          <AuthRegisterForm />
          <AuthMoreAuth />
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
siteName("auth.page_title_register_donor");
</script>
