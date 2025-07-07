<template>
  <section class="py-12 px-6">
    <div class="container mx-auto">
      <h2 class="text-2xl md:text-3xl font-bold text-black mb-8">
        {{ $t("home.platform_statistics") }}
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <template v-if="status == 'pending'">
          <v-skeleton-loader
            type="image"
            v-for="i in statistics.length"
            :key="i"
            class="rounded-xl overflow-hidden"
          />
        </template>
        <HomeStatisticsSectionStatCard
          v-else
          v-for="(stat, index) in statistics"
          :key="index"
          :imageUlr="stat.imageUlr"
          :value="stat.value"
          :suffix="stat.suffix"
          :label="$t(stat.label)"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import BuildingImg from "~/assets/images/homepage/donation.svg";
import SupportImg from "~/assets/images/homepage/support.png";
import UserImg from "~/assets/images/homepage/user.png";
import UsersImg from "~/assets/images/homepage/users.png";
import UsersGroupImg from "~/assets/images/homepage/usersgroup.png";
import UsersPlusImg from "~/assets/images/homepage/usersplus.png";

const props = defineProps(["statistics", "status"]);

const data = computed(() => props.statistics || {});
const statistics = computed(() => [
  {
    imageUlr: BuildingImg,
    value: +(+data.value.total_donations).toFixed(0),
    label: "home.total_donate",
    suffix: "$",
  },
  {
    imageUlr: UsersPlusImg,
    value: data.value.donors_count,
    label: "home.number_of_donors",
    suffix: "",
  },
  // {
  //   imageUlr: UsersGroupImg,
  //   value: data.value.beneficiary_entities,
  //   label: "home.beneficiary_entities",
  //   suffix: "",
  // },
  // {
  //   imageUlr: SupportImg,
  //   value: data.value.supporting_entities,
  //   label: "home.supporting_entities",
  //   suffix: "",
  // },
  {
    imageUlr: UserImg,
    value: data.value.platform_orphans,
    label: "home.non_sponsored_orphans",
    suffix: "",
  },
  {
    imageUlr: UserImg,
    value: data.value.sponsored_orphans,
    label: "home.sponsored_orphans",
    suffix: "",
  },
  // {
  //   imageUlr: UsersImg,
  //   value: data.value.participating_associations,
  //   label: "home.company_associations",
  //   suffix: "",
  // },
]);
</script>
