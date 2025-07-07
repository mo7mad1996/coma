<template>
  <div class="sidebar h-full flex flex-col lg:bg-gray-50 lg:pe-2" v-if="user">
    <!-- user name -->
    <div
      class="user_name flex gap-x-3 items-center px-4 py-6 max-lg:justify-center"
    >
      <img
        loading="lazy"
        :src="user.photo || '/img/placeholderImage.jpg'"
        width="30px"
        class="rounded-full aspect-square object-cover text-xs text-center"
        :alt="user.full_name"
      />
      <span v-if="user.first_name">{{ user.first_name }}</span>
    </div>

    <!-- dashboard links -->
    <ul class="list-none flex flex-col gap-2 flex-1">
      <li>
        <nuxt-link
          to="/dashboard/home"
          class="flex items-center gap-x-2 p-2 max-lg:justify-center"
          :class="{ active: $route.name == 'sponsored-item-page' }"
        >
          <v-icon icon="mdi-shield-account" size="small" />
          <span v-if="'beneficiary' == user.user_type">{{
            $t("global.campaigns")
          }}</span>
          <span v-else>{{ $t("global_dashboard.campaigns") }}</span>
        </nuxt-link>
      </li>

      <li v-if="'beneficiary' == user.user_type">
        <nuxt-link
          :to="{ name: 'orphans' }"
          class="flex items-center gap-x-2 p-2 max-lg:justify-center"
        >
          <v-icon icon="mdi-account-child-outline" size="small" />
          <span>{{ $t("global_dashboard.pages_title.orphans") }}</span>
        </nuxt-link>
      </li>
      <li v-if="'beneficiary' != user.user_type">
        <nuxt-link
          :to="{ name: 'more_campaigns' }"
          class="flex items-center gap-x-2 p-2 max-lg:justify-center"
        >
          <v-icon icon="mdi-view-grid-plus" size="small" />
          <span>{{ $t("campaigns.all_campaigns") }}</span>
        </nuxt-link>
      </li>

      <li>
        <nuxt-link
          :to="{ name: 'dashboard-settings' }"
          class="flex items-center gap-x-2 p-2 max-lg:justify-center"
        >
          <v-icon icon="mdi-cog" size="small" color="#5f7b61" />
          <span>{{ $t("donor.settings") }}</span>
        </nuxt-link>
      </li>

      <div class="lg:flex-1"></div>

      <li
        class="cursor-pointer flex gap-2 items-center text-red-700 py-4 max-lg:justify-center sticky bottom-0"
      >
        <div class="flex items-center gap-x-2 p-2" @click="logout">
          <svg
            width="16"
            height="16"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 13C2 6.98468 7.22126 2 13.8 2C14.3886 2 14.9665 2.04012 15.531 2.11744C16.0781 2.19239 16.5825 1.80958 16.6574 1.2624C16.7324 0.715225 16.3496 0.210891 15.8024 0.135939C15.1481 0.0463223 14.4795 0 13.8 0C6.24025 0 0 5.76048 0 13C0 20.2395 6.24025 26 13.8 26C14.4795 26 15.1481 25.9537 15.8024 25.8641C16.3496 25.7891 16.7324 25.2848 16.6574 24.7376C16.5825 24.1904 16.0781 23.8076 15.531 23.8826C14.9665 23.9599 14.3886 24 13.8 24C7.22126 24 2 19.0153 2 13Z"
              fill="#CC0000"
            />
            <path
              d="M22.3637 8.94959C21.9676 8.56465 21.3345 8.57364 20.9496 8.96968C20.5646 9.36571 20.5736 9.99881 20.9697 10.3837C21.1851 10.5932 21.5279 10.8628 21.8543 11.1191L21.9302 11.1787C22.2578 11.436 22.6082 11.711 22.9397 11.9919L22.9492 12H11.6667C11.1144 12 10.6667 12.4477 10.6667 13C10.6667 13.5523 11.1144 14 11.6667 14H22.9492L22.9397 14.0081C22.6082 14.289 22.2579 14.564 21.9303 14.8212L21.8543 14.8809C21.5279 15.1372 21.1851 15.4068 20.9697 15.6163C20.5736 16.0012 20.5646 16.6343 20.9496 17.0303C21.3345 17.4264 21.9676 17.4354 22.3637 17.0504C22.4853 16.9321 22.7278 16.738 23.0897 16.4537L23.1696 16.391C23.4924 16.1375 23.8712 15.8403 24.2327 15.534C24.6201 15.2057 25.0225 14.8382 25.3353 14.471C25.4921 14.2869 25.6467 14.0794 25.7661 13.8562C25.8813 13.641 26 13.3444 26 13C26 12.6556 25.8813 12.359 25.7661 12.1438C25.6467 11.9206 25.4921 11.7131 25.3353 11.5291C25.0225 11.1618 24.6201 10.7943 24.2327 10.466C23.8712 10.1597 23.4924 9.86245 23.1696 9.60903L23.0897 9.54628C22.7278 9.26202 22.4853 9.06785 22.3637 8.94959Z"
              fill="#CC0000"
            />
          </svg>

          <span>{{ $t("donor.logout") }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAuth } from "~/modules/auth/services/auth";
const { logout, user } = useAuth();
</script>

<style scoped>
.active,
.sidebar .router-link-active.router-link-active {
  @apply rounded-e-lg  text-indigo-500 lg:bg-violet-100;
}
</style>
