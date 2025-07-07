<template>
  <div>
    <h3 class="flex gap-2 items-center mb-7">
      <!-- <v-icon icon="mdi-web-plus" class="text-[#1c441e]" /> -->
      <span>
        {{ $t("auth.domain_name") }}
      </span>
    </h3>

    <div class="flex sm:text-sm gap-2 md:gap-4" style="direction: ltr">
      <div
        class="bg-neutral-100 px-4 grid place-content-center text-slate-600 border rounded-2xl !border-gray-200"
      >
        https://
      </div>

      <div
        class="bg-neutral-100 flex gap-2 md:gap-4 text-slate-600 border rounded-2xl !border-gray-200 flex-1"
      >
        <div
          class="flex-1 w-1 py-2 outline-none text-indigo-500"
          v-if="loading"
        >
          <div class="loading">
            <span v-for="b in 5" :key="b" />
          </div>
        </div>
        <Field
          v-else
          name="domain"
          :validateOnInput="true"
          id="domain"
          :placeholder="$t('auth.domain_name')"
          autocomplete="no"
          :disabled="true"
          class="flex-1 w-auto px-4 py-2 outline-none text-gray-700"
        />
        <div class="flex-1 px-4 grid place-content-center text-slate-600">
          <span class="bg-zinc-50 px-1"> .orphanssociety.com </span>
        </div>
      </div>
    </div>
  </div>

  <ErrorMessage class="error" name="domain" />
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate";
import { api } from "~/helpers/axios";

const emits = defineEmits(["update", "campaign_ids"]);
const loading = ref(false);

const getDomain = async () => {
  try {
    loading.value = true;
    const { data } = await api.get("/individual-domain");

    const { domain } = data.result;
    emits("update", domain);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getDomain();
});
</script>

<style scoped>
.error {
  @apply text-sm text-red-500;
}

/* From Uiverse.io by satyamchaudharydev */
.loading {
  --speed-of-animation: 0.9s;
  --gap: 6px;
  --first-color: #4c86f9;
  --second-color: #49a84c;
  --third-color: #f6bb02;
  --fourth-color: #f6bb02;
  --fifth-color: #2196f3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  gap: 6px;
  height: 30px;
}

.loading span {
  width: 4px;
  height: 50px;
  background: var(--first-color);
  animation: scale var(--speed-of-animation) ease-in-out infinite;
}

.loading span:nth-child(2) {
  background: var(--second-color);
  animation-delay: -0.8s;
}

.loading span:nth-child(3) {
  background: var(--third-color);
  animation-delay: -0.7s;
}

.loading span:nth-child(4) {
  background: var(--fourth-color);
  animation-delay: -0.6s;
}

.loading span:nth-child(5) {
  background: var(--fifth-color);
  animation-delay: -0.5s;
}

@keyframes scale {
  0%,
  40%,
  100% {
    transform: scaleY(0.05);
  }

  20% {
    transform: scaleY(0.3);
  }
}
</style>
