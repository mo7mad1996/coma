import { defineStore } from "pinia";

export const useGiftStore = defineStore("gift-store", {
  state: () => {
    return {
      meta: {},
    };
  },

  actions: {
    setMetaData(data: any) {
      this.meta = data;
    },
  },
});
