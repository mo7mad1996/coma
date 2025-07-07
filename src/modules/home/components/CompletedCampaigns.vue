<script setup>
const props = defineProps(["completedCampaigns", "status"]);
const { locale } = useI18n();
</script>

<template>
  <section class="px-6 my-12">
    <div class="container mx-auto">
      <div class="flex gap-5" v-if="'pending' == status">
        <v-skeleton-loader type="image" class="w-1/3" />
        <v-skeleton-loader type="article" class="w-2/3" />
      </div>
      <template v-else-if="'success' == status && completedCampaigns">
        <h1 class="text-2xl sm:text-3xl font-bold text-black my-6">
          {{ $t("home.completed_campaigns") }}
        </h1>

        <!-- component -->
        <div
          class="lg:grid lg:grid-cols-4 gap-4 px-6 lg:py-24 py-6 bg-slate-50 rounded-xl flex flex-col"
        >
          <div class="col-span-1 relative">
            <img
              :src="completedCampaigns.image || '/img/R.jpg'"
              alt="completed"
              class="rounded-3xl shadow lg:w-full w-60 m-auto"
            />

            <div class="absolute inset-0">
              <img
                :src="`/img/${locale}_.png`"
                alt="completed"
                class="rounded-3xl lg:w-full h-full object-contain w-60 m-auto drop-shadow"
              />
            </div>
          </div>

          <div class="col-span-3 px-4 py-8 lg:text-start max-lg:text-center">
            <div
              class="text-indigo-800 px-4 leading-none flex items-center lg:justify-start lg:text-4xl max-lg:text-4xl lg:my-4 max-lg:my-5 max-lg:justify-center"
            >
              <span> <i class="italic">#</i>1 </span>

              <v-icon
                icon="mdi-arrow-top-right-thin-circle-outline"
                size="md"
                color="success"
              />
            </div>
            <h1 class="font-bold text-4xl xl:mb-3 max-xl:mb-12 leading-none">
              {{ completedCampaigns.campaign_name }}
            </h1>
            <div
              class="flex gap-5 xl:flex-row max-xl:flex-col-reverse items-start"
            >
              <div class="flex-1 w-full">
                <div class="flex lg:justify-start max-lg:justify-center">
                  <div class="flex items-center mb-6">
                    <NuxtLink
                      class="underline hover:no-underline text-indigo-700"
                      :to="{
                        name: 'view-campaign',
                        params: { id: completedCampaigns.id },
                      }"
                    >
                      {{ $t("dashboard.campaign") }}
                    </NuxtLink>
                    <v-icon icon="mdi-circle-small" />
                    <p class="flex text-gray-500 gap-2">
                      <img
                        width="30"
                        v-if="
                          completedCampaigns.country?.iso &&
                          completedCampaigns?.country?.iso?.toLocaleLowerCase() !=
                            'il'
                        "
                        :src="`https://flagcdn.com/${completedCampaigns?.country?.iso?.toLocaleLowerCase()}.svg`"
                        :alt="completedCampaigns.country.name"
                      />

                      {{ completedCampaigns.country.name }}
                    </p>
                  </div>
                </div>

                <!-- 
                <div
                  class="custom-loader mt-6 text-zinc-200 max-lg:mx-auto lg:mx-0"
                ></div>
                <div>100%</div> 
                -->
              </div>

              <div
                class="grid sm:grid-cols-2 max-sm:grid-cols-1 text-center flex-1 gap-4 w-full"
              >
                <div class="col-span-1 p-5 bg-amber-50 rounded-xl">
                  <span class="font-bold text-2xl">
                    {{ completedCampaigns.total_amount }}
                    {{ completedCampaigns.currency.symbol }}
                  </span>
                  <p class="text-slate-700 text-md">
                    {{ $t("dashboard.donation_amount") }}
                  </p>
                </div>
                <div class="col-span-1 p-5 bg-lime-50 rounded-xl">
                  <span class="font-bold text-2xl">
                    {{ completedCampaigns.price_target }}
                    {{ completedCampaigns.currency.symbol }}
                  </span>

                  <p class="text-slate-700 text-md">
                    {{ $t("dashboard.campaign_goal") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
/* From Uiverse.io by cohencoo */
.custom-loader {
  max-width: 320px;
  height: 24px;
  border-radius: 20px;
  color: #f4bf00;
  border: 2px solid;
  position: relative;
}

.custom-loader::before {
  content: "";
  position: absolute;
  margin: 2px;
  inset: 0 100% 0 0;
  border-radius: inherit;
  background: #f4bf00;
  animation: p6 2s forwards;
}

@keyframes p6 {
  100% {
    inset: 0;
  }
}
</style>
