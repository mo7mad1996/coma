<template>
  <section aria-label="view details section" class="view_details">
    <!-- tabs -->
    <v-tabs
      v-model="tab"
      bg-color="white"
      class="v-slide-group v-slide-group--mobile v-tabs v-tabs--horizontal v-tabs--align-tabs-start v-tabs--density-default bg-white"
    >
      <v-tab value="one" :ripple="false">
        {{ $t("campaigns.description") }}
      </v-tab>
      <v-tab value="two" :ripple="false">{{ $t("campaigns.gallery") }}</v-tab>
      <v-tab value="three" :ripple="false">{{ $t("campaigns.update") }}</v-tab>
      <v-tab value="four" :ripple="false">{{ $t("campaigns.donors") }}</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab" class="mt-4 pb-4">
      <!-- description tap -->
      <v-tabs-window-item value="one">
        <div class="text-sm text-neutral-800 opacity-60 my-4">
          {{ $t("home.created_at") }}:
          <client-only>{{ reFormat2(campaign?.created_at) }}</client-only>
        </div>
        <p class="py-5 leading-20" v-html="campaign?.content" />

        <hr />
        <CampaignsComments />
      </v-tabs-window-item>

      <!-- galaxy tap -->
      <v-tabs-window-item value="two">
        <v-row v-if="campaign?.updates?.data.length">
          <v-col
            v-for="(image, n) in campaign?.updates?.data"
            :key="n"
            class="d-flex child-flex"
            cols="4"
          >
            <img
              v-for="i in image.gallery"
              :key="i.id"
              :src="i.url"
              :alt="image.title"
              class="bg-grey-lighten-2 rounded-md"
            />
          </v-col>
        </v-row>

        <div v-else>
          <div class="image flex justify-center">
            <img
              loading="lazy"
              src="~/assets/images/no-data.jpg"
              width="150"
              alt="orphans society image"
            />
          </div>

          <h6 class="text-center">{{ $t("campaigns.no_doners") }}</h6>
        </div>
      </v-tabs-window-item>

      <!-- updates tap -->
      <v-tabs-window-item value="three">
        <v-row v-if="campaign?.updates?.data.length">
          <v-col
            v-for="(update, index) in campaign?.updates?.data"
            :key="index"
            class="d-flex child-flex"
            md="4"
            cols="6"
          >
            <div class="card p-2 rounded-lg text-center bg-[#f8f8f8] w-full">
              <div class="image flex justify-center max-h-[10rem]">
                <img
                  loading="lazy"
                  :src="update?.image"
                  class="rounded-lg w-full aspect-video object-cover"
                  alt="orphans society image"
                />
              </div>

              <div class="content pt-2">
                <h6 class="text-xl my-2">{{ update?.title }}</h6>

                <p
                  class="text-sm opacity-60 text-start"
                  v-html="update?.content"
                ></p>
              </div>
            </div>
          </v-col>
          <v-col
            v-for="(update, index) in campaign?.updates?.data"
            :key="index"
            class="d-flex child-flex"
            md="4"
            cols="6"
          >
            <div class="card p-2 rounded-lg text-center bg-[#f8f8f8] w-full">
              <div class="image flex justify-center max-h-[10rem]">
                <img
                  loading="lazy"
                  :src="update?.image"
                  class="rounded-lg w-full aspect-video object-cover"
                  alt="orphans society image"
                />
              </div>

              <div class="content pt-2">
                <h6 class="text-xl my-2">{{ update?.title }}</h6>

                <p
                  class="text-sm opacity-60 text-start"
                  v-html="update?.content"
                ></p>
              </div>
            </div>
          </v-col>
        </v-row>

        <div v-else>
          <div class="image flex justify-center">
            <img
              loading="lazy"
              src="~/assets/images/no-data.jpg"
              width="150"
              alt="orphans society image"
            />
          </div>

          <h6 class="text-center">{{ $t("campaigns.no_doners") }}</h6>
        </div>
      </v-tabs-window-item>

      <!-- donors tap -->
      <v-tabs-window-item value="four">
        <v-tabs
          v-model="donors_tab"
          bg-color="white"
          class="v-slide-group v-slide-group--mobile v-tabs v-tabs--horizontal v-tabs--align-tabs-start v-tabs--density-default bg-white"
        >
          <v-tab value="latest" :ripple="false">{{
            $t("donor.latest_donors")
          }}</v-tab>
          <v-tab value="top_donors" :ripple="false">{{
            $t("donor.top_donors")
          }}</v-tab>
        </v-tabs>

        <v-tabs-window v-model="donors_tab" class="mt-4 pb-4">
          <!-- description tap -->
          <v-tabs-window-item value="latest">
            <v-row>
              <v-col
                v-for="(donor, index) in campaign?.latest"
                :key="index"
                class="d-flex child-flex"
                cols="4"
              >
                <div
                  class="card py-6 rounded-lg text-center bg-white w-full border !border-violet-500"
                >
                  <div class="image flex justify-center mb-3">
                    <div
                      class="aspect-square w-12 grid place-content-center border !border-indigo-500 bg-zinc-50 rounded-full"
                    >
                      {{ donor.name[0] }}
                    </div>
                  </div>

                  <span class="font-bold">${{ donor?.total_amount }}</span>
                  <h6 class="text-neutral-800 opacity-60 text-sm">
                    {{ donor?.name }}
                  </h6>
                </div>
              </v-col>
            </v-row>

            <GlobalNoData :status="status" :data="campaign?.latest" />
          </v-tabs-window-item>
          <v-tabs-window-item value="top_donors">
            <v-row>
              <v-col
                v-for="(donor, index) in Object.values(
                  campaign?.top_doners || {}
                ).filter((i) => i != null)"
                :key="index"
                class="d-flex child-flex"
                cols="4"
              >
                <div
                  class="card py-6 rounded-lg text-center bg-white w-full border !border-violet-500"
                >
                  <div class="image flex justify-center mb-3">
                    <div
                      class="aspect-square w-12 grid place-content-center border !border-indigo-500 bg-zinc-50 rounded-full"
                    >
                      {{ donor.name[0] }}
                    </div>
                  </div>

                  <span class="font-bold">${{ donor?.total_amount }}</span>
                  <h6 class="text-neutral-800 opacity-60 text-sm">
                    {{ donor?.name }}
                  </h6>
                </div>
              </v-col>
            </v-row>

            <GlobalNoData
              :status="status"
              :data="
                Object.values(campaign?.top_doners || {}).filter(
                  (i) => i != null
                )
              "
            />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-tabs-window-item>
    </v-tabs-window>
  </section>
</template>

<script setup>
import img from "~/assets/images/chalenge-img.png";
import { useCampaign } from "../../typescript/view-campaign";
import { reFormat2 } from "~/helpers/format-date";
const props = defineProps({
  campaign: {
    required: true,
  },
  target: {
    required: true,
  },
  amount: {
    required: true,
  },
  status: {
    required: true,
  },
});

const donors_tab = ref("latest");

const { onEnterViewport, tab, isImageLoaded } = useCampaign();

onMounted(() => {
  onEnterViewport(true);
});
</script>
<style>
.v-tab {
  text-transform: capitalize;
}
</style>
