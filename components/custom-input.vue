<template>
  <label class="relative">
    <input
      class="w-full px-[50px] py-[20px] rounded-[10px] border-input-br border-2 text-lg leading-[1.5rem] mb-2.5 focus:ring-inset focus:ring-regal-gray focus:ring-[2px] focus:outline-none placeholder:capitalize placeholder:text-input-ph bg-input-bg bg-no-repeat bg-[left_13px_center]"
      v-model="computedValue"
      :class="[
        icon,
        {
          '!px-[25px] py-[20px] !w-[64px] h-[64px] text-center': name === 'otp',
        },
      ]"
      :type="type"
      :placeholder="placeholder"
      :ref="inputRef"
    />
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

const props = defineProps({
  type: String,
  placeholder: String,
  modelValue: [String, Number],
  icon: String,
  name: String,
  inputRef: Function,
});

const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get: () => modelValue!.value,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>
