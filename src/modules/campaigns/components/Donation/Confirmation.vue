<template>
  <div class="mt-2 md:!mt-sm text-sm text-gray-700">
    <p class="leading-7">
      {{ $t("global.donation_notice.agreement") }}
      <a
        class="underline text-gray-950"
        target="_blank"
        href="https://orphanssociety.com/page/01975eed-df41-70d3-affe-2d4e019e0b35"
        >{{ $t("global.donation_notice.terms") }}</a
      >
      <br />
      {{ $t("global.donation_notice.and_acknowledge") }}
      <a
        href="https://orphanssociety.com/page/01975eec-6efa-71ba-8999-5c294df85bcf"
        class="underline text-gray-950"
        target="_blank"
        >{{ $t("global.donation_notice.privacy") }}</a
      >
    </p>

    <!-- <p>
      {{ $t("global.donation_notice.learn_more") }}
      <a href="#" class="underline">{{
        $t("global.donation_notice.pricing")
      }}</a>
    </p> -->

    <div class="flex items-start gap-4 mt-2 md:!pt-8">
      <div class="rounded-full bg-indigo-50 p-2">
        <svg
          class="w-6 h-6 text-indigo-500"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
          />
          <path d="M9 12l2 2 4-4" />
        </svg>
      </div>
      <div>
        <p class="font-bold">
          {{ $t("global.donation_notice.protects") }}
        </p>
        <p class="mt-1 text-gray-600">
          {{ $t("global.donation_notice.refund") }}

          <br />
          <a href="#" class="underline text-gray-950">
            {{ $t("global.donation_notice.guarantee_link") }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
