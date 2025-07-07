<template>
  <div class="blog_card cursor-pointer max-w-full">
    <div class="image">
        <nuxt-link :to="route">
          <slot name="image"></slot>
        </nuxt-link>
    </div>
    <nuxt-link :to="route">
      <h3
        class="font-semibold text-2xl hover:text-primary cursor-pointer leading-[36px] mt-3 mb-0 text-[#121212]"
      >
        <slot name="title"></slot>
      </h3>
    </nuxt-link>

    <p class="mt-2 text-sm text-justify leading-20 text-[#00000099]">
      <slot name="desc"></slot>
    </p>
  </div>
</template>

<script setup>
const props = defineProps(["route"]);
</script>

<style scoped>
.image {
  position: relative;
}

/* [dir="ltr"] .image {
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.9164478291316527) 11%,
      rgba(255, 255, 255, 0) 95%
    );
  }
} */

/* [dir="rtl"] .image {
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0.9164478291316527) 11%,
      rgba(255, 255, 255, 0) 95%
    );
  }
} */
/* 
@media (max-width: 767px) {
  .image {
    &::before {
      background: rgb(0, 0, 0);
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.8324142156862745) 43%,
        rgba(255, 255, 255, 0) 95%
      );
    }
  }
} */
</style>
