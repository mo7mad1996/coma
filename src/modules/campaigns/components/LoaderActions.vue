<template>
  <v-skeleton-loader
    v-for="i in 3"
    key="i"
    class="bg-transparent"
    :width="i == 2 ? '70%' : '100%'"
    type="text"
  />
  <div class="flex gap-4 px-8">
    <v-skeleton-loader
      class="bg-transparent flex-1 h-4 rounded overflow-hidden"
      height="30px"
      type="image"
    />

    <div class="flex flex-1 gap-4">
      <v-skeleton-loader
        class="bg-transparent flex-1 h-4 rounded overflow-hidden"
        height="30px"
        type="image"
      />
      <v-skeleton-loader
        class="bg-transparent flex-1 h-4 rounded overflow-hidden"
        height="30px"
        type="image"
      />
    </div>
  </div>
  <v-skeleton-loader
    v-for="i in 2"
    key="i"
    class="bg-transparent"
    :width="i == 2 ? '70%' : '100%'"
    type="text"
  />
  <hr class="my-5" />

  <v-skeleton-loader class="bg-transparent" type="text" />
  <v-skeleton-loader
    class="bg-transparent"
    v-for="(item, index) in 3"
    :key="index"
    type="list-item-avatar"
  />
</template>
