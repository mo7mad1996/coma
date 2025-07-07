export default {
  mounted(el: HTMLElement, binding: any) {
    if (!el) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      binding.value(entries[0].isIntersecting); // Trigger the callback function
    };

    const observer = new IntersectionObserver(callback);
    observer.observe(el);
  },
  unmounted(el: any) {
    if (el._observer) {
      el._observer.disconnect();
    }
  },
};
