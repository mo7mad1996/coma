<template>
  <div
    ref="targetRef"
    @mousemove="set_position"
    @pointerenter="pointerenter"
    @pointerleave="
      isHovered = false;
      animated = false;
    "
    class="bg-purple-50 py-3 px-2 rounded-xl shadow-sm flex flex-col items-center text-center relative overflow-hidden"
  >
    <div class="flex items-center justify-center gap-4">
      <p class="text-2xl font-bold">
        <bdi>{{ suffix }}{{ currentValue }}</bdi>
      </p>
      <img
        loading="lazy"
        :src="imageUlr"
        class="w-7 h-7 md:w-10 md:h-10"
        alt="orphan society icons "
      />
    </div>
    <p class="text-gray-700 font-semibold text-sm mt-3 md:mt-6">{{ label }}</p>
    <div class="absolute" ref="animatedRef" :class="{ animated }" />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
const props = defineProps<{
  imageUlr: string;
  value?: number;
  label: string;
  suffix?: string;
}>();

const targetRef = ref<HTMLElement | null>(null);
const animatedRef = ref<HTMLElement | null>(null);
const currentValue = ref(0);

let animationFrame: number | null = null;

const isHovered = ref(false);
const animated = ref(false);
const position = reactive({ x: 0, y: 0 });

const easeOutQuad = (t: number) => t * (2 - t);

const animateValue = (duration: number) => {
  let startTime: number | null = null;
  const startValue = currentValue.value;
  const endValue: any = props.value;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    currentValue.value = Math.round(
      startValue + (endValue - startValue) * easeOutQuad(progress)
    );

    if (progress < 1) {
      animationFrame = requestAnimationFrame(step);
    } else {
      currentValue.value = endValue;
    }
  };

  if (animationFrame) cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(step);
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateValue(2000); // animateValue(time for transition)
      } else {
        currentValue.value = 0;
      }
    },
    { threshold: 0.1 }
  );

  if (targetRef.value) {
    observer.observe(targetRef.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  if (animationFrame) cancelAnimationFrame(animationFrame);
});

const set_position = (e: MouseEvent) => {
  const parent = (e.currentTarget as HTMLElement).getBoundingClientRect();

  position.x = e.clientX - parent.left;
  position.y = e.clientY - parent.top;
};
const pointerenter = () => {
  isHovered.value = true;
  setTimeout(startAnimation, 100);
};

const startAnimation = () => {
  if (isHovered.value && animatedRef.value) {
    animatedRef.value.style.left = `${position.x}px`;
    animatedRef.value.style.top = `${position.y}px`;
    animated.value = true;
  }
};
</script>

<style lang="scss" scoped>
.animated {
  padding: 130px;
  backdrop-filter: hue-rotate(140deg) invert(77%);
  transition: padding 1.4s;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
</style>
