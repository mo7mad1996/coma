<template>
  <v-dialog v-if="false" v-model="dialogVisible" max-width="500">
    <v-card>
      <v-card-title>
        {{ $t("campaigns.comments") }}
      </v-card-title>
      <v-card-text>
        {{ $t("campaigns.comment_dec") }}
      </v-card-text>
      <v-card-text>
        <v-form @submit.prevent="sendData">
          <v-textarea
            v-model="comment"
            :label="$t('campaigns.comment')"
            rows="4"
            outlined
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="dialogVisible = false">
          {{ $t("campaigns.cancel") }}
        </v-btn>
        <v-btn
          color="primary"
          @click="sendData"
          :loading="loading"
          :disabled="loading"
        >
          {{ $t("campaigns.save") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { api } from "~/helpers/axios";

const { t } = useI18n();
const dialogVisible = ref(true);
const comment = ref("");
const route = useRoute();
const { $toast } = useNuxtApp();

const loading = ref(false);

const sendData = async () => {
  try {
    loading.value = true;

    if (comment.value) {
      const res = await api.post("/add/comment", {
        comment: comment.value,
        donation_id: route.query.donation_id,
      });
    }
    dialogVisible.value = false;
    $toast.success(t("campaigns.thanks"));
  } catch (err) {
    $toast.error(err.response?.data?.message || err.message);
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>
