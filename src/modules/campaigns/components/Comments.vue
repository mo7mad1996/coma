<template>
  <div class="comments pt-sm text-[#121212]">
    <div
      class="header flex justify-between items-center mb-4"
      v-if="commentsMeta?.total"
    >
      <h1 class="text-2xl leading-[36px] text-[#121212]">
        {{ $t("campaigns.words_of_support") }} ( {{ commentsMeta?.total }} )
      </h1>

      <!-- <v-menu>
        <template #activator="{ props }">
          <div
            class="flex items-center gap-x-2 cursor-pointer py-2"
            v-bind="props"
          >
            <span class="text-sm">{{ $t("campaigns.sorted_by") }}</span>
            <v-icon size="small">mdi-sort</v-icon>
          </div>
        </template>

        <ul class="shadow">
          <li @click="sortby(sort_types.DATE)" class="group p-1">
            <div
              class="px-2 py-3 cursor-pointer text-slate-700 text-sm group-hover:bg-gray-50 flex gap-2 rounded"
            >
              <v-icon
                icon="mdi-sort-calendar-ascending"
                class="text-gray-400"
              />

              {{ $t("donor.date_time") }}
            </div>
          </li>
        </ul>
      </v-menu> -->
    </div>

    <!-- comment input (write a comment) -->
    <div class="comment-part py-0 px-5">
      <!-- here display all comments && comments.length -->
      <div>
        <div class="all-comments" v-if="comments.length">
          <CampaignsComment
            v-for="(comment, index) in comments"
            :key="index"
            :comment="comment"
          />
          <div
            v-observe-visibility="onVisibilityChange"
            v-if="!isFinish"
            class="loader"
          ></div>
        </div>

        <div
          v-if="comments.length == 0 && status == 'success'"
          class="py-4 text-center"
        >
          <h3 class="text-3xl text-[#12121299]">
            {{ $t("home.no_comments") }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useComments } from "../services/comments";
const route = useRoute();

const { locale } = useI18n();
enum sort_types {
  DATE = "date",
}

const { comments, status, currentPage, commentsMeta, isFinish, isLoading } =
  useComments(route.params.id);

let isAsc = true;

const sortby = (sort_type: sort_types) => {
  switch (sort_type) {
    case sort_types.DATE:
      comments.value.sort((a: any, b: any) =>
        isAsc
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      isAsc = !isAsc;
      break;
  }
};

const onVisibilityChange = (d: boolean) => {
  if (d && !isLoading.value) currentPage.value += 1;
};
</script>
