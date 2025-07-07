<script setup>
const props = defineProps({
  data: { require: true, type: Array },
  name: { required: true, type: String },
});

const model = defineModel();
</script>
<template>
  <div class="radio-inputs my-4 flex">
    <label class="radio" v-for="item in data">
      <input
        type="radio"
        v-model="model"
        :name="name"
        :value="item.value"
        :disabled="item.disabled"
      />
      <span class="name">{{ item.title }}</span>
    </label>
  </div>
</template>

<style scoped lang="scss">
/* From Uiverse.io by 00Kubi */
.radio-inputs {
  position: relative;
  flex-wrap: wrap;
  gap: 3px;
  border-radius: 0.5rem;
  background-color: #eee;
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  font-size: 14px;

  .radio {
    flex: 1 1 auto;
    text-align: center;

    .name {
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
      border: none;
      padding: 0.5rem;
      user-select: none;
      color: rgba(51, 65, 85, 1);
      transition: all 0.15s ease-in-out;
    }

    input {
      display: none;

      &:checked + .name {
        background-color: #fff;
        font-weight: 600;
        position: relative;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        animation: select 0.3s ease;
      }
      &[disabled] + .name {
        color: #c6bdbd;
        cursor: not-allowed;
      }
    }

    &:hover .name {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
}

/* Animation */

@keyframes select {
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Particles */
.radio-inputs .radio input:checked + .name::before,
.radio-inputs .radio input:checked + .name::after {
  content: "";
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #3b82f6;
  opacity: 0;
  animation: particles 0.5s ease forwards;
}

.radio-inputs .radio input:checked + .name::before {
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
}

.radio-inputs .radio input:checked + .name::after {
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
}

@keyframes particles {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(var(--direction));
  }
}

.radio-inputs .radio input:checked + .name::before {
  --direction: -10px;
}

.radio-inputs .radio input:checked + .name::after {
  --direction: 10px;
}
</style>
