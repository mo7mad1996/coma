<template>
  <Transition>
    <li v-if="show">
      <nuxt-link
        class="flex items-center gap-4 bg-green-50 p-2 rounded"
        :to="{ name: 'view-campaign', params: { id: item.id } }"
      >
        <img
          :src="item.image || '/img/R.jpg'"
          v-if="'image' == item.type"
          class="aspect-square w-16 rounded-full border"
          :alt="item.campaign_name"
        />
        <video
          :src="item.image"
          loop
          autoplay
          muted
          playsinline
          v-if="'video' == item.type"
          class="aspect-square w-16 rounded-full border"
        />

        <div class="flex-1">
          <h3 class="font-bold mb-2">{{ item.name }}</h3>
          <p class="text-zinc-500 text-sm leading-8">
            {{ item.campaign_name }}
            <br />
            {{ $t("donor.for_each_orphan") }}

            <span
              class="rounded inline-block px-2 mx-2 bg-cyan-100 text-cyan-700"
            >
              {{ data.carts.data.find((i) => item.id == i.campaign_id).amount }}
              {{ $t("campaigns.usd") }}
            </span>

            <span class="rounded inline-block px-2 bg-slate-300" v-if="true">
              <!-- v-if="'equal' == data.donate_flow" -->
            </span>
            <span v-else>
              {{ $t("donor.by_admin") }}
            </span>
          </p>
        </div>

        <div @click.prevent.stop>
          <v-dialog max-width="500" @click.prevent.stop>
            <template v-slot:activator="{ props: activatorProps }">
              <VBtn
                @click.prevent.stop
                v-bind="activatorProps"
                color="#ef4444"
                class="mx-4"
                icon="mdi-file-document-remove"
                density="comfortable"
                variant="tonal"
                :disabled="loading"
                :loading="loading"
              ></VBtn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-item>
                  <v-card-title>
                    {{ $t("donor.delete") }}
                  </v-card-title>

                  <v-card-subtitle>
                    <div class="my-3">
                      {{ $t("donor.delete_question") }}
                    </div>
                  </v-card-subtitle>
                </v-card-item>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn @click="isActive.value = false">
                    {{ $t("donor.cancel") }}
                  </v-btn>

                  <v-btn
                    @click="
                      remove();
                      isActive.value = false;
                    "
                  >
                    {{ $t("donor.remove") }}</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </nuxt-link>
    </li>
  </Transition>
</template>

<script setup>
import { api } from "~/helpers/axios";
import { useTenant } from "~/helpers/tenant";

const route = useRoute();
const props = defineProps(["item", "campaigns", "data"]);
const emit = defineEmits(["remove"]);
const { backendUrl } = useTenant();

const show = ref(true);
const loading = ref(false);

const remove = async () => {
  try {
    loading.value = true;
    const item = props.item;

    const res = await api.delete(
      `${backendUrl}/recurring-donations/remove-orphan`,
      {
        params: {
          campaign_id: item.id,
          recurring_donation_id: route.params.id,
        },
      }
    );

    show.value = false;
    emit("remove", props.item);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
