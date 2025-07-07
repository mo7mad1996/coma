import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    totalCount: null as number | null,
  }),
  actions: {
    setCartCount(count: number) {
      this.totalCount = count;
    },
    getCartCount() {
      return this.totalCount;
    },
    increaseCartCount(amount: number) {
      if (this.totalCount === null) {
        this.totalCount = 0;
      }
      this.totalCount = Number(this.totalCount) + Number(amount);
    },
    decreaseCartCount(amount: number) {
      if (this.totalCount === null) {
        this.totalCount = 0;
      }
      this.totalCount = Number(this.totalCount) - Number(amount);
    },
  },
});
