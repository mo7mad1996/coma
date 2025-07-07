<template>
  <div
    class="flex gap-4 before:bg-neutral-200 after:bg-neutral-200 before:flex-1 after:flex-1 before:h-[1px] after:h-[1px] before:content-[''] after:content-[''] items-center my-8 text-zinc-500"
  >
    {{ $t("auth.or_login_with") }}
  </div>

  <div class="flex gap-6 flex-col">
    <button
      aria-label="Signup with Google"
      type="button"
      class="rounded-xl bg-violet-100 py-4 px-6 hover:bg-violet-200 transition-all duration-200 ease-in-out cursor-pointer gap-4 flex items-center justify-center"
      @click="loginWithGoogle"
      title=" Google"
    >
      <img
        src="~/assets/images/auth/google.png"
        alt="Google"
        class="w-6 h-6 block"
      />

      <span>{{ $t("auth.continue_with_google") }}</span>
    </button>
  </div>
</template>

<script setup>
import { useAuth } from "~/modules/auth/services/auth";
const { loginWithGoogle } = useAuth();
</script>
